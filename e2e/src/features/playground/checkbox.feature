Feature: As a user I can interact with checkboxes

  As a user I can interact with check box

  @smoke
  @regression
  Scenario: As a user I can interact and assert on checkboxes
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "blue" checkbox should not be checked
    And I check "green" checkbox
    And I check "grey" checkbox
    And the "red" checkbox should not be checked
    And the "purple" checkbox should not be checked
    And I uncheck "green" checkbox
    And the "green" checkbox should not be checked