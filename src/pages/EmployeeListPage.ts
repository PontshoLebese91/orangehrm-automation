import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EmployeeListPage extends BasePage {

    private readonly employeeIdInput: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.employeeIdInput = this.page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Employee Id' })
    .locator('input');

        this.searchButton = this.page
            .getByRole('button', { name: 'Search' });
    }

    async searchByEmployeeId(employeeId: string): Promise<void> {
        await this.employeeIdInput.fill(employeeId);
        await this.searchButton.click();

        await expect(
        this.page.locator('.oxd-table-body')
    ).toBeVisible({ timeout: 10000 });
    }

    async verifyEmployeeDisplayed(employeeId: string): Promise<void> {
    const employeeRow = this.page
        .locator('.oxd-table-body .oxd-table-card')
        .filter({ hasText: employeeId });

    await expect(employeeRow).toBeVisible();
}

async verifyEmployeeDetails(employeeId: string): Promise<void> {
    const employeeRow = this.page
        .locator('.oxd-table-body .oxd-table-card')
        .filter({ hasText: employeeId });

    await expect(employeeRow).toBeVisible();

    await expect(employeeRow).toContainText(employeeId);
    await expect(employeeRow).toContainText('John');
    await expect(employeeRow).toContainText('Michael');
    await expect(employeeRow).toContainText('Doe');
    await expect(employeeRow).toContainText('QA Engineer');
    await expect(employeeRow).toContainText('Full-Time Contract');
    await expect(employeeRow).toContainText('Quality Assurance');
}

async captureEmployeeSearchScreenshot(): Promise<void> {
    await this.takeScreenshot('test-results/employee-search.png');
}

}