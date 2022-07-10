import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";



Then(
  /^the "([^"]*)" should contain the text "(.*)"$/,
  async function (elementKey: string, expectedElementValue: string) {
    const {
      screen:{page}
    }=this
    console.log(
      `The ${elementKey} should contain text ${expectedElementValue}`
    );

    const contact = await page.textContent("[data-id='contacts']");

    expect(contact).toBe(expectedElementValue);
  }
);
