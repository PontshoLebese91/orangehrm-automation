import { Page, expect, Locator } from "@playwright/test";

export class PIMPage {

    private readonly addEmployeeLink;
    private readonly employeeListLink: Locator;

    constructor(private page: Page) {
        this.addEmployeeLink = this.page.getByRole('link', { name: 'Add Employee' });
        this.employeeListLink = this.page.getByRole('link', { name: 'Employee List', exact: true });
    }

    async verifyPIMPageLoaded(): Promise<void> {
        await expect(
            this.page.getByRole('heading', { name: 'PIM' })
        ).toBeVisible();
    }

    async navigateToAddEmployee(): Promise<void> {
        await this.addEmployeeLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    } 

    async navigateToEmployeeList(): Promise<void> {
        await this.employeeListLink.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(
        /\/pim\/viewEmployeeList/
    );
    }
}