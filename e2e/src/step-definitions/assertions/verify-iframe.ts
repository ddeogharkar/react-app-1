import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../setup/world";
import {ElementKey} from "../../env/global"
import { getElementLocator} from "../../support/web-element-helper"
import {waitFor} from "../../support/wait-for-behavior"
import { getIframeElement } from "../../support/html-behavior";

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,async function(
  this:ScenarioWorld,elementKey: ElementKey,iframeName:string,negate:boolean)
  {
  const {
  screen:{page},      
  globalConfig,
}=this

console.log(`the ${elementKey} on the ${iframeName} iframe should ${negate?`not`:``} be displayed`);

const elementIdentifier = getElementLocator(page,elementKey,globalConfig);
const iframeIdentifier = getElementLocator(page,iframeName,globalConfig);
const elementIframe = await getIframeElement(page,iframeIdentifier);

await waitFor(async()=>{
  const isElementVisible = (await elementIframe?.$(elementIdentifier))!=null;
  return isElementVisible === !negate
})

})

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/, 
async function(
  this:ScenarioWorld,elementKey: ElementKey,iframeName:string,negate:boolean,expectedElementValue: string
){
  const {
    screen:{page},      
    globalConfig,
  }=this

  console.log("expectedElementValue",expectedElementValue);
  console.log(
    `the ${elementKey} on the ${iframeName} iframe should ${negate?`not`:``} contain the text ${expectedElementValue}`
  );

const elementIdentifier = getElementLocator(page,elementKey,globalConfig);
const iframeIdentifier = getElementLocator(page,iframeName,globalConfig);
const elementIframe = await getIframeElement(page,iframeIdentifier);

await waitFor(async()=>{
  const elementText = await elementIframe?.textContent(elementIdentifier);
  console.log("elementText", elementText)
  return elementText?.includes(expectedElementValue)===!negate;
})

})

Then(/^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/, 
async function(
  this:ScenarioWorld,elementKey: ElementKey,iframeName:string,negate:boolean,expectedElementValue: string
){
  const {
    screen:{page},      
    globalConfig,
  }=this

  console.log("expectedElementValue",expectedElementValue);
  console.log(
    `the ${elementKey} on the ${iframeName} iframe should ${negate?`not`:``} equal the text ${expectedElementValue}`
  );

const elementIdentifier = getElementLocator(page,elementKey,globalConfig);
const iframeIdentifier = getElementLocator(page,iframeName,globalConfig);
const elementIframe = await getIframeElement(page,iframeIdentifier);

await waitFor(async()=>{
  const elementText = await elementIframe?.textContent(elementIdentifier);
  console.log("elementText", elementText)
  return (elementText===expectedElementValue)===!negate;
})

})

