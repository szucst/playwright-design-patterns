Feature: Login

    Scenario: Login with valid credentials
        Given the user is on the login page
        When the user enters a valid email and password
        Then the user should see their email and password in the URL