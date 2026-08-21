import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class JobPage extends BasePage {

    private readonly jobTab: Locator;
    private readonly joinedDateInput: Locator;
    private readonly jobTitleDropdown: Locator;
    private readonly jobCategoryDropdown: Locator;
    private readonly subUnitDropdown: Locator;
    private readonly locationDropdown: Locator;
    private readonly employmentStatusDropdown: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.jobTab = this.page
    .locator('.orangehrm-tabs-wrapper')
    .getByText('Job', { exact: true });

        this.joinedDateInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Joined Date' })
            .locator('input');

        this.jobTitleDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Job Title' })
            .locator('.oxd-select-text');

        this.jobCategoryDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Job Category' })
            .locator('.oxd-select-text');

        this.subUnitDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Sub Unit' })
            .locator('.oxd-select-text');

        this.locationDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Location' })
            .locator('.oxd-select-text');

        this.employmentStatusDropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employment Status' })
            .locator('.oxd-select-text');

        this.saveButton = this.page
            .getByRole('button', { name: 'Save', exact: true });
    }

    async navigateToJob(): Promise<void> {
        await this.jobTab.click();

        await expect(this.page).toHaveURL(
            /\/pim\/viewJobDetails\/empNumber\/\d+$/
        );
    }

    async enterJoinedDate(joinedDate: string): Promise<void> {
        await this.joinedDateInput.fill(joinedDate);
    }

    async selectJobTitle(jobTitle: string): Promise<void> {
        await this.selectDropdown(this.jobTitleDropdown, jobTitle);
    }

    async selectJobCategory(jobCategory: string): Promise<void> {
        await this.selectDropdown(this.jobCategoryDropdown, jobCategory);
    }

    async selectSubUnit(subUnit: string): Promise<void> {
        await this.selectDropdown(this.subUnitDropdown, subUnit);
    }

    async selectLocation(): Promise<void> {
    await this.locationDropdown.click();

    const options = this.page
        .locator('.oxd-select-dropdown .oxd-select-option')
        .filter({ hasNotText: '-- Select --' });

    await expect(options.first()).toBeVisible();

    await options.first().click();
}

    async selectEmploymentStatus(status: string): Promise<void> {
        await this.selectDropdown(this.employmentStatusDropdown, status);
    }

   private async selectDropdown(
    dropdown: Locator,
    option: string
): Promise<void> {

    await expect(dropdown).toBeVisible();
    await dropdown.click();

    const dropdownOptions = this.page.locator('.oxd-select-dropdown');

    // 1. Try exact match first
    const exactOption = dropdownOptions.getByText(option, { exact: true });

    if (await exactOption.count() > 0) {
        await exactOption.first().click();
        return;
    }

    // 2. Fallback: match option starting with expected value
    const partialOption = dropdownOptions
        .locator('div')
        .filter({
            hasText: new RegExp(`^${option}(\\s|$)`)
        });

    await expect(partialOption.first()).toBeVisible({
        timeout: 10000
    });

    await partialOption.first().click();
}

    async saveJobDetails(): Promise<void> {
        await this.saveButton.click();
    }

    async verifySuccessfullySaved(): Promise<void> {
    await this.verifySuccessToast('Successfully Updated');
}

}