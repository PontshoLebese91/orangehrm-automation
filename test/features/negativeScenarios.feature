Feature: Negative Employee Management Scenarios

  Scenario: Cannot add an employee without a first name

    Given I am logged in to the HR management system
    When I navigate to the PIM module
    And I navigate to the Add Employee page
    And I enter an employee without a first name
    And I attempt to save the employee
    Then the first name validation message should be displayed

  Scenario: Cannot add an employee without a last name

    Given I am logged in to the HR management system
    When I navigate to the PIM module
    And I navigate to the Add Employee page
    And I enter an employee without a last name
    And I attempt to save the employee
    Then the last name validation message should be displayed


Scenario: Login with invalid credentials

    Given I am on the login page
    When I enter invalid username and password
    And I click the login button
    Then the invalid login message should be displayed


Scenario: Cannot login with blank credentials
    Given I am on the login page
    When I leave the username and password blank
    And I click the login button
    Then the username and password required messages should be displayed