import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';


let loginPage : LoginPage;

Given ('I am on the login page', async function () {
    
    loginPage = new LoginPage(this.page);

    await loginPage.navigate();
});

When('I enter valid username and password', async function () {
    await loginPage.enterCredentials(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
});


Then('I should be redirected to the dashboard page', async function () {
    await loginPage.verifyLoginSuccessful();
});

When('I enter invalid username and password', async function () {

    await loginPage.enterCredentials(
        'InvalidUser',
        'InvalidPassword'
    );
});

Then('the invalid login message should be displayed', async function () {

    await loginPage.verifyInvalidLoginMessage();
});


When('I leave the username and password blank', async function () {
    await loginPage.enterCredentials('', '');
});

When('I click the login button', async function () {
    await loginPage.clickLoginButton();
});

Then('the invalid credentials message should be displayed', async function () {
    await loginPage.verifyInvalidLoginMessage();
});

Then('the username and password required messages should be displayed', async function () {
    await loginPage.verifyRequiredLoginMessages();
});