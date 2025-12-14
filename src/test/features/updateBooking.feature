@TC5
Feature: Update Posts

@PUTWithToken
  Scenario: Update a post fully using PUT with Token
    When I update the stored booking of id 1 with firstname "Rukesh" and lastname "Rao"