import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

    private readonly dashboardHeading =
        this.page.getByRole('heading', { name: 'Dashboard' });

    private readonly pimMenu: Locator =
        this.page.getByRole('link', { name: 'PIM' });

    async verifyDashboardLoaded(): Promise<void> {
        await expect(this.dashboardHeading).toBeVisible();
    }

     async navigateToPIM(): Promise<void> {
        await this.pimMenu.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}