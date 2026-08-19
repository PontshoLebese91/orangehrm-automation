Feature: PIM

As an HR administrator

I want to access the PIM module

So that I can manage employee records

Scenario: Navigate to Add Employee from the PIM module

    Given I am logged in to the HR management system

    When I navigate to the PIM module

    And I navigate to the Add Employee page

    Then I should be redirected to the Add Employee page