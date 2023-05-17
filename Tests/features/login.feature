Feature: Sign In

  Scenario: User logs in with valid credentials
    Given there is a user with the email "ff@gmail.com" and the password "ff"
    When the user enters their email and password
    Then the message "User connected" is displayed and the user is redirected to the home page.
