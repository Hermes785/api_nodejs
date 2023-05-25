Feature: Sign In

  Scenario: User logs in with valid credentials
    Given  there is a user with the name "john", email "ll@gmail.com" and the password "ll"
    When  the user enters their email "ll@gmail.com" and password "ll"
    Then  the message "User connected" is displayed and the user is redirected to the home page.
