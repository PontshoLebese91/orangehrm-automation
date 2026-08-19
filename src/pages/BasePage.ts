import { expect, Locator, Page } from '@playwright/test';
import fs from 'fs';

export abstract class BasePage {
    constructor(protected readonly page: Page) {}

    protected async clickElement(element: Locator): Promise<void> {
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
        await element.click();
    }

    protected async fillInput(element: Locator, value: string): Promise<void> {
        await expect(element).toBeVisible();
        await element.fill(value);
    }

    protected async getText(element: Locator, expectedText: string): Promise<void> {
        await expect(element).toBeVisible();
        await expect(element).toHaveText(expectedText);
    }

    protected async waitForUrl(urlPattern: RegExp): Promise<void> {
        await expect(this.page).toHaveURL(urlPattern);
    }

    async takeScreenshot(filename: string): Promise<void> {
        const directory = filename.substring(0, filename.lastIndexOf('/'));

        if (directory) {
            fs.mkdirSync(directory, { recursive: true });
        }

        await this.page.screenshot({ path: filename, fullPage: true });
    }

    async verifySuccessToast(
    message: 'Successfully Created' | 'Successfully Updated' | 'Successfully Saved'
): Promise<void> {
    await expect(
        this.page.locator('.oxd-toast').filter({
            hasText: message
        })
    ).toBeVisible({ timeout: 10000 });
}


}