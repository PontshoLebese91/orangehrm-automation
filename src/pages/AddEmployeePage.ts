import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddEmployeePage extends BasePage {

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly employeeIdInput: Locator;
    private readonly createLoginToggle: Locator;
    private readonly saveButton: Locator;
    private readonly employeeIdError: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = this.page.getByPlaceholder('First Name');

        this.lastNameInput = this.page.getByPlaceholder('Last Name');

        this.middleNameInput = this.page.getByPlaceholder('Middle Name');

        this.employeeIdInput = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.createLoginToggle = this.page.locator(
            'input[type="checkbox"]'
        );

        this.saveButton = this.page.getByRole('button', {
            name: 'Save'
        });

        this.employeeIdError = this.page.getByText(
            'Employee Id already exists',
            { exact: true }
        );
    }

    async verifyAddEmployeePageLoaded(): Promise<void> {
        await expect(
            this.page.getByRole('heading', {
                name: 'Add Employee',
                level: 6
            })
        ).toBeVisible();
    }

    async enterEmployeeNames(
        firstName: string,
        lastName: string,
        middleName?: string
    ): Promise<void> {

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);

        if (middleName) {
            await this.middleNameInput.fill(middleName);
        }
    }

    async getEmployeeId(): Promise<string> {
        return await this.employeeIdInput.inputValue();
    }

    async enableCreateLoginDetails(): Promise<void> {
        await this.createLoginToggle.check();
    }

    async saveEmployee(): Promise<string> {
    const originalEmployeeId = await this.getEmployeeId();

    await this.saveButton.click();

    // Normal case: employee is created successfully
    try {
        await this.page.waitForURL(
            /\/pim\/viewPersonalDetails\/empNumber\/\d+$/,
            { timeout: 10000 }
        );

        return originalEmployeeId;

    } catch {
        // Save did not navigate.
        // Check whether the Employee ID already exists.
    }

    const duplicateIdExists = await this.employeeIdError.isVisible({
        timeout: 5000
    }).catch(() => false);

    if (!duplicateIdExists) {
        throw new Error(
            `Employee could not be saved. Unexpected state. Current URL: ${this.page.url()}`
        );
    }

    // Generate a new Employee ID
    const newEmployeeId = this.generateUniqueEmployeeId();

    await this.employeeIdInput.fill(newEmployeeId);

    await this.saveButton.click();

    // Verify retry succeeded
    await expect(this.page).toHaveURL(
        /\/pim\/viewPersonalDetails\/empNumber\/\d+$/,
        { timeout: 60000 }
    );

    return newEmployeeId;
}

    private generateUniqueEmployeeId(): string {
        return Date.now().toString().slice(-6);
    }

    async verifyEmployeeAddedSuccessfully(): Promise<void> {

        await expect(this.page).toHaveURL(
            /\/pim\/viewPersonalDetails\/empNumber\/\d+$/,
            {
                timeout: 60000
            }
        );
    }

    async enterEmployeeWithoutFirstName(): Promise<void> {

        await this.lastNameInput.fill('Doe');
        await this.middleNameInput.fill('Michael');
    }

    async attemptToSaveEmployee(): Promise<void> {
        await this.saveButton.click();
    }

    async verifyFirstNameRequired(): Promise<void> {

        const firstNameGroup = this.page
            .locator('.oxd-input-group')
            .filter({ has: this.firstNameInput });

        await expect(
            firstNameGroup.getByText('Required', {
                exact: true
            })
        ).toBeVisible();
    }

    async enterEmployeeWithoutLastName(): Promise<void> {

        await this.firstNameInput.fill('John');
        await this.middleNameInput.fill('Michael');
    }

    async verifyLastNameRequired(): Promise<void> {

        const lastNameGroup = this.page
            .locator('.oxd-input-group')
            .filter({ has: this.lastNameInput });

        await expect(
            lastNameGroup.getByText('Required', {
                exact: true
            })
        ).toBeVisible();
    }
}

