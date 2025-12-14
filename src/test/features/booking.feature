@TC1
Feature: API Chaining for Booking Update

  Scenario: Create a booking and then update it using PUT
    When I create a user and then create a post for that user
      | Field           | Value      |
      | firstname       | John       |
      | lastname        | Doe        |
      | totalprice      |        150 |
      | depositpaid     | false      |
      | checkin         | 2025-11-01 |
      | checkout        | 2025-11-05 |
      | additionalneeds | Breakfast  |
    Then I fetch the booking and it should match the created data
    When I update the booking with:
      | Field           | Value      |
      | firstname       | John       |
      | lastname        | Cena       |
      | totalprice      |       150 |
      | depositpaid     | false      |
      | checkin         | 2025-11-01 |
      | checkout        | 2025-11-05 |
      | additionalneeds | Breakfast  |
    Then the booking should reflect the update
    When I partially update the booking firstname "Randy" and lastname "orton"
    When I delete the booking with ID
    Then fetching the booking should return 404
