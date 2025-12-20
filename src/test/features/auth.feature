@TC7 @smoke @noAuthSetup
Feature: Authentication Feature

  Scenario: Generate Token with invalid credentials
    When I attempt to generate a token with invalid credentials username "invalidUser" and password "invalidPass"
    Then the response status should be 200