Feature: Personal Details

As an HR administrator

I want to update an employee's personal details

So that employee information is accurate

Scenario: Update employee personal details

    Given I am logged in to the HR management system
    When I navigate to the PIM module
    And I navigate to the Add Employee page
    And I enter valid employee details
    And I save the employee
    Then the employee should be added successfully
    #Then I should be on the Personal Details page

    When I update the employee personal details
    And I save the personal details
    Then the employee personal details should be updated successfully

    When I add an attachment "test-document.csv"
    And I save the attachment
    Then the attachment "test-document.csv" should be displayed in the attachments table

    When I navigate to the Job tab
    And I update the job details
    And I save the job details
    Then the job details should be saved successfully

    When I navigate to the Employee List
    And I search for the newly added employee
    Then the employee should be displayed in the employee table
    And the employee details should be accurate
    And I capture a full page screenshot of the employee search