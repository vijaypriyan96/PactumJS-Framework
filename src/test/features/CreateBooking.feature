@TC2
Feature: Booking Feature

  Scenario: Create a new booking
#     When I create a new bookings
    When I create a new booking in the herokuapp
      | Field           | Value      |
      | firstname       | Rukesh     |
      | lastname        | Rao        |
      | totalprice      |        222bb |
      | depositpaid     | false      |
      | checkin         | 2025-12-01 |
      | checkout        | 2025-12-02 |
      | additionalneeds | Breakfast  |
      When I try to create a booking with invalid totalprice expecting status 500
        | Field           | Value      |
      | firstname       | Rukesh     |
      | lastname        | Rao        |
      | totalprice      |        ABC |
      | depositpaid     | false      |
      | checkin         | 2025-12-01 |
      | checkout        | 2025-12-02 |
      | additionalneeds | Breakfast  |