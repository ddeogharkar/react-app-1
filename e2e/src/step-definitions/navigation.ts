import { Given, setDefaultTimeout } from "@cucumber/cucumber";
import { PageId } from "../env/global";
import { currentPathMatchesPageId, navigateToPage, reloadPage } from "../support/navigation-behavior";
import { waitFor } from "../support/wait-for-behavior";
import { ScenarioWorld } from "./setup/world";


Given(/^I am on the "([^"]*)" page$/, async function (this: ScenarioWorld, pageId: PageId) {
  const {
    screen: { page },
    globalConfig,
  } = this
  console.log(`I am on the ${pageId} page`);

  await navigateToPage(page, pageId, globalConfig)
  //await page.goto("http://localhost:3000/");

  //await global.page.timeout(30000);

  await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
});

Given(/^I am directed to the "([^"]*)" page$/, async function (this: ScenarioWorld, pageId: PageId) {
  const {
    screen: { page },
    globalConfig,
  } = this

  console.log(`I am direceted to the ${pageId} page`);

  await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));
})

Given(/^I refresh the "([^"]*)" page$/, async function (
  this: ScenarioWorld, pageId: PageId
) {
  const {
    screen: { page },
    globalConfig
  } = this

  console.log(`I refresh the ${pageId} page`)


  await reloadPage(page)

  await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig), {
    timeout: 30000
  })

})