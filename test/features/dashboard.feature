Feature: Dashboard

As an HR administrator

I want to access the HR management dashboard

So that I can manage employee records and perform administrative tasks

Scenario: Navigate to PIM from the dashboard

    Given I am logged in to the HR management system

    When I navigate to the PIM module

    Then I should be redirected to the PIM page


Scenario: Navigate to Add Employee from the PIM module

    Given I am logged in to the HR management system

    When I navigate to the PIM module

    And I navigate to the Add Employee page

    Then I should be redirected to the Add Employee page