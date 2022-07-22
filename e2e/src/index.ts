import dotenv from "dotenv";
import { env, getJsonFromFile } from "./env/parseEnv"
import { HostsConfig, PagesConfig, GlobalConfig, PageElementMappings } from "./env/global";
import * as fs from "fs";

const environment = env('NODE_ENV')


dotenv.config({ path: env('COMMON_CONFIG_FILE') });
dotenv.config({ path: `${env('ENV_PATH')}${environment}.env` })

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
//console.log("hostsConfig", hostsConfig)
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));
//console.log("pagesConfig", pagesConfig)
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)
//console.log("mappingFiles", mappingFiles)

const pageElementMappings: PageElementMappings = mappingFiles.reduce((pageElementConfigAcc, file) => {
  //console.log("pageElementConfigAcc", pageElementConfigAcc)
  //console.log("file", file)
  const key = file.replace('.json', '')
  const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
  return { ...pageElementConfigAcc, [key]: elementMappings }
}, {})

//console.log("pageElementMappings", pageElementMappings)

const worldParameters: GlobalConfig = {
  hostsConfig,
  pagesConfig,
  pageElementMappings,
};

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/report.json \
                --format progress-bar \
                --parallel ${env('PARALLEL')} \
                --retry ${env('RETRY')} `;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

console.log('\n🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 \n');

export { smoke, dev, regression };