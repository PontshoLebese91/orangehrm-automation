import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { PIMPage } from '../../src/pages/PIMPage';
import { AddEmployeePage } from '../../src/pages/AddEmployeePage';

let dashboardPage!: DashboardPage;
let pimPage!: PIMPage;

When('I navigate to the Add Employee page', async function () {
    const pimPage = new PIMPage(this.page);
    await pimPage.navigateToAddEmployee();
});

Then('I should be redirected to the Add Employee page', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.verifyAddEmployeePageLoaded();
});




