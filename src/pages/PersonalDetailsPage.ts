import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PersonalDetailsPage extends BasePage {

    private readonly driverLicenseInput: Locator;
    private readonly dateOfBirthInput: Locator;
    private readonly attachmentAddButton: Locator;
    private readonly attachmentSaveButton: Locator;
    private readonly maritalStatusDropdown: Locator;
    private readonly nationalityDropdown: Locator;
    private readonly saveButton: Locator;
    private readonly attachmentSection: Locator;
    private readonly attachmentTable: Locator;
    

    constructor(page: Page) {
        super(page);

        this.driverLicenseInput = this.page.getByLabel('Driver\'s License Number');
        this.dateOfBirthInput = this.page.locator('.oxd-input-group').filter({ hasText: 'Date of Birth' }).getByPlaceholder('yyyy-dd-mm');
        this.maritalStatusDropdown = this.page.getByLabel('Marital Status');
        this.nationalityDropdown = this.page.getByLabel('Nationality');
        this.saveButton = this.page.locator('form').filter({ hasText: 'Employee Full' }).getByRole('button', { name: 'Save' });
        this.attachmentAddButton = this.page.getByRole('button', { name: 'Add' });
        //this.attachmentSaveButton = this.page.locator('.orangehrm-attachment').getByRole('button', { name: 'Save' });
        this.attachmentSection = this.page.locator('.orangehrm-attachment');
        this.attachmentTable = this.attachmentSection.locator('.oxd-table');
        this.attachmentSaveButton = this.attachmentSection.getByRole('button',{ name: 'Save' });
    }

    async verifyPersonalDetailsPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(
            /\/pim\/viewPersonalDetails\/empNumber\/\d+$/
        );
    }

    async updateDriverLicense(licenseNumber: string): Promise<void> {
        await this.driverLicenseInput.fill(licenseNumber);
    }

    async updateDateOfBirth(dateOfBirth: string): Promise<void> {
        await this.dateOfBirthInput.fill(dateOfBirth);
    }

    async selectGender(gender: 'Male' | 'Female'): Promise<void> {
     const genderOption = this.page
        .locator('.--gender-grouped-field')
        .getByText(gender, { exact: true });

    await genderOption.click();
}

    async selectMaritalStatus(maritalStatus: string): Promise<void> {
        await this.maritalStatusDropdown.selectOption(maritalStatus);
    }

    async selectNationality(nationality: string): Promise<void> {
        await this.nationalityDropdown.selectOption(nationality);
    }

    async clickSaveButton(): Promise<void> {
        await this.saveButton.click();
    }

    async updatePersonalDetails(
    nationality: string,
    maritalStatus: string,
    dateOfBirth: string,
    gender: 'Male' | 'Female'): Promise<void> {

    await this.selectDropdown('Nationality', nationality);
    await this.selectDropdown('Marital Status', maritalStatus);
    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.selectGender(gender);
}

    async selectDropdown(label: string, option: string): Promise<void> {
    const dropdown = this.page
                .locator('.oxd-input-group')
                .filter({ hasText: label })
                .locator('.oxd-select-text');

            await dropdown.click();

            await this.page
                .getByText(option, { exact: true })
                .click();
    }

   async addAttachment(filePath: string): Promise<void> {
        await this.attachmentAddButton.click();

        await expect(
            this.attachmentSection.getByText('Add Attachment', { exact: true })
        ).toBeVisible();

        const fileChooserPromise = this.page.waitForEvent('filechooser');

        await this.attachmentSection.getByText('Browse', { exact: true }).click();

        const fileChooser = await fileChooserPromise;

        await fileChooser.setFiles(filePath);
    }

    async verifyFileSelected(fileName: string): Promise<void> {
        await expect(
            this.attachmentSection.getByText(fileName, { exact: true })
        ).toBeVisible();
    }

    async verifyAttachmentSaved(fileName: string): Promise<void> {
    const fileNameCell = this.attachmentTable
        .locator('.oxd-table-card')
        .getByText(
            new RegExp(
                `^${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
                'i'
            )
        );

    await expect(fileNameCell).toBeVisible({ timeout: 10000 });
}

    async saveAttachment(): Promise<void> {
    await this.attachmentSaveButton.click();
}

// async verifyPersonalDetailsSaved(): Promise<void> {
//     await expect(
//         this.page.locator('.oxd-toast').filter({
//             hasText: /Successfully Updated/i
//         })
//     ).toBeVisible({ timeout: 10000 });
// }

async verifyPersonalDetailsSaved(): Promise<void> {
    await this.verifySuccessToast('Successfully Updated');
}
}