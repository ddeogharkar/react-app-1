import { Then } from "@cucumber/cucumber";
//import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { waitFor } from "../../support/wait-for-behavior"


Then(
  /^the "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: string, negate: boolean) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    console.log(`the ${elementKey} should ${negate ? `not` : ``} be displayed`);

    //const locator = page.locator("[data-id='header logo']")

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    //const locator = page.locator(elementIdentifier)
    //await expect(locator).toBeVisible();

    await waitFor(async () => {
      const isElementVisible = (await page.$(elementIdentifier)) != null
      return isElementVisible === !negate;
    })
  }
);


Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {
    const {
      screen: { page },
      globalConfig
    } = this

    console.log(`the ${elementPosition} ${elementKey} should ${negate ? `not` : ``} be displayed`)

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    const index = Number(elementPosition.match(/\d/g)?.join('')) - 1

    await waitFor(async () => {
      const isElementVisible = (await page.$(`${elementIdentifier}>>nth = ${index}`)) != null
      return isElementVisible === !negate
    })
  })

Then(/^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
  async function (this: ScenarioWorld, negate: boolean, count: string, elementKey: ElementKey) {
    const {
      screen: { page },
      globalConfig
    } = this

    console.log(`I should ${negate ? `not` : ``} see ${count} ${elementKey} displayed`)

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

    await waitFor(async () => {
      const element = await page.$$(elementIdentifier)
      return (Number(count) === element.length) === !negate
    })
  })

