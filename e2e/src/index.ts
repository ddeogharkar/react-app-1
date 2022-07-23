import dotenv from "dotenv";
import { env, getJsonFromFile } from "./env/parseEnv"
import { HostsConfig, PagesConfig, GlobalConfig, PageElementMappings, EmailsConfig } from "./env/global";
import * as fs from "fs";
import { generateCucumberRuntimeTag } from "./support/tag-helper";
//import { logger } from "./logger";

const environment = env('NODE_ENV')


dotenv.config({ path: env('COMMON_CONFIG_FILE') });
dotenv.config({ path: `${env('ENV_PATH')}${environment}.env` })

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
//logger.log("hostsConfig", hostsConfig)
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));
//logger.log("pagesConfig", pagesConfig)
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)
//logger.log("mappingFiles", mappingFiles)

const getEnvList = (): string[] => {
  const envList = Object.keys(hostsConfig)

  if (envList.length === 0) {
    throw Error(`🐞 No environment mapped in your ${env('HOSTS_URL_PATH')}`)
  }
  return envList
}

const emailsConfig: EmailsConfig = getJsonFromFile(env('EMAILS_URLS_PATH'))

const pageElementMappings: PageElementMappings = mappingFiles.reduce((pageElementConfigAcc, file) => {
  //logger.log("pageElementConfigAcc", pageElementConfigAcc)
  //logger.log("file", file)
  const key = file.replace('.json', '')
  const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
  return { ...pageElementConfigAcc, [key]: elementMappings }
}, {})

//logger.log("pageElementMappings", pageElementMappings)

const worldParameters: GlobalConfig = {
  hostsConfig,
  pagesConfig,
  pageElementMappings,
  emailsConfig
};

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/report.json \
                --format progress-bar \
                --parallel ${env('PARALLEL')} \
                --retry ${env('RETRY')} `;

const dev = generateCucumberRuntimeTag(common, environment, getEnvList(), 'dev')
//const dev = `${common} --tags '@dev'`;
//const smoke = `${common} --tags '@smoke'`;
//const regression = `${common} --tags '@regression'`;
const smoke = generateCucumberRuntimeTag(common, environment, getEnvList(), 'smoke')
const regression = generateCucumberRuntimeTag(common, environment, getEnvList(), 'regression')

//logger.log('\n🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 \n');

export { smoke, dev, regression };
