import { expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    
    private readonly usernameInput = this.page.locator('input[name="username"]');
    private readonly passwordInput = this.page.locator('input[name="password"]');
    private readonly loginButton = this.page.getByRole('button', { name: 'Login'});
    private readonly invalidLoginMessage = this.page.getByText('Invalid credentials', { exact: true });

    async navigate(): Promise<void> {
        await this.page.goto(process.env.BASE_URL!, {
            waitUntil: 'domcontentloaded', timeout: 60000
        });


        await expect(this.page).toHaveURL(/login/,{timeout:30000});
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccessful(): Promise<void> {
        await expect(this.page).toHaveURL(/dashboard/, {timeout: 30000});
    }

    async enterCredentials(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async verifyInvalidLoginMessage(): Promise<void> {
    await expect(
        this.page
            .locator('.oxd-alert-content--error')
            .getByText('Invalid credentials', { exact: true })
    ).toBeVisible();
}

async verifyRequiredLoginMessages(): Promise<void> {
    const usernameGroup = this.page
        .locator('.oxd-input-group')
        .filter({ has: this.usernameInput });

    const passwordGroup = this.page
        .locator('.oxd-input-group')
        .filter({ has: this.passwordInput });

    await expect(
        usernameGroup.getByText('Required', { exact: true })
    ).toBeVisible();

    await expect(
        passwordGroup.getByText('Required', { exact: true })
    ).toBeVisible();
}


}