Feature: Add Employee

As an HR administrator

I want to add a new employee

So that employee records can be maintained in the HR system

Scenario: Add employee with valid details

    Given I am logged in to the HR management system

    When I navigate to the PIM module

    And I navigate to the Add Employee page

    And I enter valid employee details

    And I save the employee

    Then the employee should be added successfully