import { When, Then } from '@cucumber/cucumber';
import { AddEmployeePage } from '../../src/pages/AddEmployeePage';
import employeeData from '../../src/data/employeeData.json';

When('I enter valid employee details', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.enterEmployeeNames(
        employeeData.employee.firstName,
        employeeData.employee.lastName,
        employeeData.employee.middleName
    );
});

When('I save the employee', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    this.employeeId = await addEmployeePage.saveEmployee();

});

Then('the employee should be added successfully', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);
    
    await addEmployeePage.verifyEmployeeAddedSuccessfully();
});

When('I enter an employee without a first name', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.enterEmployeeWithoutFirstName();
});

When('I attempt to save the employee', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.attemptToSaveEmployee();
});

Then('the first name validation message should be displayed', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.verifyFirstNameRequired();
});

When('I enter an employee without a last name', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.enterEmployeeWithoutLastName();
});

Then('the last name validation message should be displayed', async function () {
    const addEmployeePage = new AddEmployeePage(this.page);

    await addEmployeePage.verifyLastNameRequired();
});