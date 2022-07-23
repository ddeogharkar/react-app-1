import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from "../env/global"
import { getElementLocator } from "../support/web-element-helper"
import { waitFor } from "../support/wait-for-behavior"
import { scrollInToView } from "../support/html-behavior";
import { logger } from "../logger";

Then(/^I scroll to the "([^"]*)"$/, async function (
  this: ScenarioWorld, elementKey: ElementKey) {
  const {
    screen: { page },
    globalConfig
  } = this

  logger.log(`I scroll to the ${elementKey}`)

  const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

  await waitFor(async () => {
    const result = await page.waitForSelector(elementIdentifier, {
      state: "visible"
    })
    if (result) {
      await scrollInToView(page, elementIdentifier);
    }
    return result;
  })

}

)