import { Given, When, Then } from '@cucumber/cucumber';
import path from 'path';
import { AddEmployeePage } from '../../src/pages/AddEmployeePage';
import { PersonalDetailsPage } from '../../src/pages/PersonalDetailsPage';
import { PIMPage } from '../../src/pages/PIMPage';
import { EmployeeListPage } from '../../src/pages/EmployeeListPage';
import employeeData from '../../src/data/employeeData.json';

Then('I should be on the Personal Details page', async function () {
    const personalDetailsPage = new PersonalDetailsPage(this.page);

    await personalDetailsPage.verifyPersonalDetailsPageLoaded();
});

When('I update the employee personal details', async function () {
    const personalDetailsPage = new PersonalDetailsPage(this.page);

    await personalDetailsPage.updatePersonalDetails(
        employeeData.employee.nationality,
        employeeData.employee.maritalStatus,
        employeeData.employee.dateOfBirth,
        employeeData.employee.gender as 'Male' | 'Female'
        // 'South African',
        // 'Married',
        // '1990-01-15',
        // 'Male'
    );
});

When('I save the personal details', async function () {
    const personalDetailsPage = new PersonalDetailsPage(this.page);

    await personalDetailsPage.clickSaveButton();
});

Then('the employee personal details should be updated successfully', async function () {
    const personalDetailsPage = new PersonalDetailsPage(this.page);

    await personalDetailsPage.verifyPersonalDetailsSaved();
});

When(
    'I add an attachment {string}',
    async function (fileName: string) {

        const personalDetailsPage = new PersonalDetailsPage(this.page);

        const filePath = path.resolve(
            'src',
            'data',
            'attachments',
            fileName
        );

        await personalDetailsPage.addAttachment(filePath);
    }
);

When('I save the attachment',async function () {

        const personalDetailsPage = new PersonalDetailsPage(this.page);

        await personalDetailsPage.saveAttachment();
    }
);

Then('the attachment {string} should be displayed in the attachments table',async function (fileName: string) {

        const personalDetailsPage = new PersonalDetailsPage(this.page);

        await personalDetailsPage.verifyAttachmentSaved(fileName);
    }
);

When('I navigate to the Employee List', async function () {
    const pimPage = new PIMPage(this.page);

    await pimPage.navigateToEmployeeList();
});

When('I search for the newly added employee', async function () {
    const employeeListPage = new EmployeeListPage(this.page);

    await employeeListPage.searchByEmployeeId(this.employeeId);
});

Then('the employee should be displayed in the employee table', async function () {
    const employeeListPage = new EmployeeListPage(this.page);

    await employeeListPage.verifyEmployeeDisplayed(this.employeeId);
});

Then('the employee details should be accurate', async function () {
    const employeeListPage = new EmployeeListPage(this.page);

    await employeeListPage.verifyEmployeeDetails(this.employeeId);
});

Then('I capture a full page screenshot of the employee search', async function () {
    const employeeListPage = new EmployeeListPage(this.page);

    await employeeListPage.captureEmployeeSearchScreenshot();
});