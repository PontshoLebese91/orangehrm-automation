Feature: Login

As an HR administrator
I want to be able to log in to the HR management system
So that I can manage employee records and perform administrative tasks  

Scenario: Successful login with valid credentials
  Given I am on the login page
  When I enter valid username and password
  And I click the login button
  Then I should be redirected to the dashboard page
