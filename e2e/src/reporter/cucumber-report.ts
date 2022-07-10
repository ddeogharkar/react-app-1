import dotenv from "dotenv";
import  Reporter, {Options} from "cucumber-html-reporter";
import {env} from "../env/parseEnv"

dotenv.config({path:env('COMMON_CONFIG_FILE')})

const options:Options={
  theme:'bootstrap',
  jsonFile:env('JSON_REPORT_FILE'),
  output:env('HTML_REPORT_FILE'),
  screenshotsDirectory:env('SCREENSHOTS_PATH'),
  storeScreenshots:true,
  reportSuiteAsScenarios:true,
  launchReport:false
}

Reporter.generate(options);