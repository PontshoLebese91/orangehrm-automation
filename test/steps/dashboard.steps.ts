import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { PIMPage } from '../../src/pages/PIMPage';
import { AddEmployeePage } from '../../src/pages/AddEmployeePage';

Given('I am logged in to the HR management system', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.enterCredentials(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginSuccessful();
});

When('I navigate to the PIM module', async function () {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.navigateToPIM();
});

Then('I should be redirected to the PIM page', async function () {
    const pimPage = new PIMPage(this.page);
    await pimPage.verifyPIMPageLoaded();
});

