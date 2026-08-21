# OrangeHRM End-to-End Test Automation

## Overview

This project contains an end-to-end test automation framework for the OrangeHRM demo application.

The automation covers the employee management journey:

**Login → Dashboard → PIM → Add Employee → Personal Details → Attachments → Job Details → Employee List → Employee Verification → Screenshot**

The framework is implemented using **Playwright, TypeScript and Cucumber** and follows the **Page Object Model (POM)** design pattern.

The project also includes negative scenarios, dynamic Employee ID handling, failure screenshots and Allure reporting.

---

## Application Under Test

**Application:** OrangeHRM Demo

**URL:** https://opensource-demo.orangehrmlive.com/

The application is used for test and demonstration purposes.

---

## Technology Stack

* Node.js
* TypeScript
* Playwright
* Cucumber
* Page Object Model (POM)
* dotenv
* Allure reporting
* GitHub Actions

---

## Repository

The source code is available in the public GitHub repository:

**https://github.com/PontshoLebese91/orangehrm-automation**

---

## Project Structure

```text
orangehrm-qa-automation/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── src/
│   ├── data/
│   │   ├── employeeData.json
│   │   └── attachments/
│   │       └── test-document.csv
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── PIMPage.ts
│   │   ├── AddEmployeePage.ts
│   │   ├── PersonalDetailsPage.ts
│   │   ├── JobPage.ts
│   │   └── EmployeeListPage.ts
│   │
│   └── hooks/
│       └── hooks.ts
│
├── test/
│   ├── features/
│   │   ├── login.feature
│   │   ├── dashboard.feature
│   │   ├── pim.feature
│   │   ├── employee.feature
│   │   ├── personalDetails.feature
│   │   ├── jobDetails.feature
│   │   └── negativeScenarios.feature
│   │
│   └── steps/
│       ├── login.steps.ts
│       ├── pim.steps.ts
│       ├── addEmployee.steps.ts
│       ├── personalDetails.steps.ts
│       ├── jobDetails.steps.ts
│       └── employeeList.steps.ts
│
├── .env.example
├── .gitignore
├── cucumber.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Install the following:

* Node.js
* npm
* Git

Verify the installations:

```bash
node --version
npm --version
git --version
```

---

## Installation

Clone the public repository:

```bash
git clone https://github.com/PontshoLebese91/orangehrm-automation.git
```

Navigate into the project:

```bash
cd orangehrm-automation
```

Install dependencies:

```bash
npm ci
```

Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

---

## Environment Configuration

The application configuration and credentials are supplied through environment variables.

Create a `.env` file in the project root:

```text
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
```

A `.env.example` file is included in the repository as a template.

The real `.env` file is excluded from Git using `.gitignore`.

Credentials are therefore not committed to the repository.

---

## Running the Tests

### Run the complete test suite

```bash
npm run Test:all
```

### Run the login tests

```bash
npm run Test:login
```

### Run the dashboard tests

```bash
npm run Test:dashboard
```

### Run the PIM tests

```bash
npm run Test:pim
```

### Run the employee creation tests

```bash
npm run Test:addEmployee
```

### Run the personal details tests

```bash
npm run Test:personalDetails
```

### Run the job details tests

```bash
npm run Test:jobDetails
```

### Run the negative scenarios

```bash
npm run Test:negativeTest
```

---

## Headless Execution

The test framework supports both headed and headless execution.

By default, tests run headlessly.

To run the tests with the browser visible locally, set:

```text
HEADLESS=false
```

For example:

```powershell
$env:HEADLESS="false"
npm run Test:all
```

GitHub Actions runs the tests in headless mode.

---

## End-to-End Test Coverage

The main employee management flow covers:

1. Navigate to the OrangeHRM application.
2. Log in using valid credentials.
3. Verify the Dashboard.
4. Navigate to PIM.
5. Navigate to Add Employee.
6. Enter employee details.
7. Save the employee.
8. Verify successful employee creation.
9. Handle an existing Employee ID when encountered.
10. Generate a new Employee ID and retry the save.
11. Update personal details.
12. Verify the personal details update.
13. Upload an attachment.
14. Verify the attachment appears in the attachment table.
15. Navigate to the Job tab.
16. Update job information.
17. Verify the job update notification.
18. Navigate to Employee List.
19. Search using the captured Employee ID.
20. Verify the employee record.
21. Verify relevant employee details.
22. Capture a full-page screenshot.

---

## Dynamic Employee ID Handling

The Employee ID is handled dynamically.

When an employee is created successfully, the Employee ID used during creation is captured by the test.

If OrangeHRM reports:

```text
Employee Id already exists
```

the framework:

1. Detects the duplicate Employee ID validation message.
2. Generates a new unique Employee ID.
3. Updates the Employee ID field.
4. Saves the employee again.
5. Verifies successful navigation to the Personal Details page.
6. Stores the final Employee ID for use later in the test.

This prevents test execution from failing simply because a previously generated Employee ID already exists in the demo environment.

---

## Page Object Model

The framework follows the Page Object Model design pattern.

Each application page has a dedicated page object containing:

* Locators
* Page-specific actions
* Page-specific validations

Common functionality is maintained in `BasePage`.

Examples include:

* Element interaction
* URL validation
* Success toast validation
* Full-page screenshots

This keeps the feature files focused on business behaviour while application-specific selectors remain inside the page objects.

---

## Selector Strategy

The framework prioritises stable selectors where possible.

The implementation uses:

* Accessible roles
* Labels
* Placeholders
* Descriptive text
* Application-specific classes where required

Selectors are maintained inside page objects rather than directly inside feature files.

---

## Success Notifications

The framework validates success notifications after critical update operations.

These include:

* Personal details updates
* Job details updates

Success toast validation is centralised in `BasePage`.

Employee creation is additionally validated by confirming navigation to the employee's Personal Details page.

---

## Negative Scenarios

Additional negative scenarios demonstrate validation and error handling.

The suite includes scenarios for:

* Invalid login credentials
* Blank login credentials
* Creating an employee without a first name
* Creating an employee without a last name
* Existing Employee ID handling

The negative scenarios verify that invalid actions result in appropriate application validation messages rather than silent failures.

---

## Failure Screenshots

When a Cucumber scenario fails, the `After` hook captures a full-page screenshot and attaches it to the Cucumber execution evidence.

This provides visual evidence of the application state at the time of failure.

Screenshots generated during the test execution are stored under:

```text
test-results/
```

The directory is excluded from Git because it contains generated execution artifacts.

---

## Allure Reporting

The project supports Allure reporting.

Run the complete test suite and generate the report using:

```bash
npm run Test:report
```

The report can then be opened using:

```bash
npm run Report:open
```

Allure provides visibility into:

* Test scenarios
* Test steps
* Passed and failed tests
* Execution details
* Test evidence

The generated `allure-report/` and `allure-results/` directories are excluded from Git.

---

## GitHub Actions CI

The project includes a GitHub Actions workflow:

```text
.github/workflows/ci.yml
```

The CI pipeline:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs project dependencies.
4. Installs Playwright Chromium.
5. Runs the complete Cucumber test suite.
6. Generates the Allure report.
7. Uploads the Allure report as a GitHub Actions artifact.
8. Uploads Allure results.
9. Uploads failure screenshots and test results when available.

The CI environment executes the tests in **headless mode**.

The required application configuration is supplied through GitHub Actions repository secrets.

---

## GitHub Actions Secrets

The following repository secrets are required:

```text
BASE_URL
ADMIN_USERNAME
ADMIN_PASSWORD
```

These values are used by the CI workflow and are not stored directly in the source code.

---

## Test Data

Test data is externalised where appropriate.

Employee and job information is maintained in:

```text
src/data/employeeData.json
```

Example data includes:

* First name
* Middle name
* Last name
* Nationality
* Marital status
* Date of birth
* Gender
* Joined date
* Job title
* Job category
* Sub Unit
* Employment status

The Employee ID is handled dynamically during execution.

---

## Error Handling

The automation uses Playwright assertions, URL checks and explicit waits to handle asynchronous application behaviour.

Examples include:

* Waiting for elements to become visible
* Waiting for navigation
* Validating success notifications
* Detecting duplicate Employee IDs
* Generating replacement Employee IDs
* Waiting for dropdown options
* Validating employee records after searching
* Capturing screenshots when scenarios fail

The framework avoids unnecessary fixed delays where possible.

---

## Expected Result

A successful execution of the complete suite should result in all scenarios passing.

Example:

```text
11 scenarios (11 passed)
94 steps (94 passed)
```

The exact execution time may vary depending on the OrangeHRM demo environment and CI runner.

---

## Assessment Requirements Covered

The implementation addresses the assessment requirements through:

* End-to-end employee management flow
* Playwright automation
* TypeScript
* Cucumber BDD
* Page Object Model
* Stable selectors
* Dynamic Employee ID handling
* Dropdown handling
* Success notification validation
* Negative scenarios
* Error handling
* Environment variables
* Full-page screenshots
* Allure reporting
* Headless CI execution
* GitHub Actions
* Public GitHub repository
* Setup and execution instructions

---

## Author

**Pontsho Victor Lebese**

Senior Automation Engineer
