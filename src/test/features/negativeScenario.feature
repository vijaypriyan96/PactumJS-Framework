@TC6
Feature: Negative Scenarios for Booking API

  Scenario: update booking without authentication token
   When I create booking using json file "booking.data.json"
    When I try to update the booking without token
      | Field           | Value      |
      | firstname       | John       |
      | lastname        | Cena       |
      | totalprice      |       150  |
      | depositpaid     | false      |
      | checkin         | 2025-11-01 |
      | checkout        | 2025-11-05 |
      | additionalneeds | Breakfast  |
    Then the response status should be 403
     