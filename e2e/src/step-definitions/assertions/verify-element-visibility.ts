import { Then } from "@cucumber/cucumber";
//import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import {ElementKey} from "../../env/global"
import { getElementLocator} from "../../support/web-element-helper"
import {waitFor} from "../../support/wait-for-behavior"


Then(
  /^the "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: string,negate:boolean) {
      const {
          screen: { page },         
          globalConfig,
      } = this;

      console.log(`the ${elementKey} should ${negate?`not`:``} be displayed`);

      //const locator = page.locator("[data-id='header logo']")

      const elementIdentifier = getElementLocator(page,elementKey,globalConfig);
      //const locator = page.locator(elementIdentifier)
      //await expect(locator).toBeVisible();

      await waitFor(async()=>{
        const isElementVisible = (await page.$(elementIdentifier))!=null
        return isElementVisible===!negate;
      })
  }
);



  

