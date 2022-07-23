export const generateCucumberRuntimeTag = (
  commonConfig: string,
  runtimeEnv: string,
  avaialbleEnvList: string[],
  runtimeTag: string
): string => {
  const tagExpression = avaialbleEnvList
    .filter(e => e !== runtimeEnv)
    .map(e => `(@${runtimeTag} and not @${e})`)
    .join(` and `)
  return `${commonConfig} --tags '${tagExpression}'`
}