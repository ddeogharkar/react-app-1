Feature:As a user I can interact with login forms

  @smoke
  @regression
  Scenario Outline: As a user I can populate login details leveragin environment variables
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "$.TEST_EMAIL"
    And I fill in the "password" input with "$.TEST_PASSWORD"
    And the "email" should contain the value "admin@testingtalkshub.com.au"
    And the "password" should contain the value "<password>"

    @localhost
    Examples:
      | password     |
      | password@123 |

    @production
    Examples:
      | password   |
      | J2r@kka@IL |

  @smoke
  @regression
  Scenario Outline:As a user I expect validation on the login input for an incorrect email
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "<email>"
    Then I fill in the "password" input with "password@123"
    And the "email error" should contain the text "Please include an '@' in the email address."
    Examples:
      | email |
      | add   |
      | cam.  |
      | cam.@ |
