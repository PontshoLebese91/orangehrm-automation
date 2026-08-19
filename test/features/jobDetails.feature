Feature: Job Details

As an HR administrator

I want to update an employee's job details

So that employee employment information is accurate

Scenario: Update employee job details

    Given I am logged in to the HR management system
    When I navigate to the PIM module
    And I navigate to the Add Employee page
    And I enter valid employee details
    And I save the employee
    Then I should be on the Personal Details page
    When I navigate to the Job tab
    And I update the job details
    And I save the job details
    Then the job details should be saved successfully