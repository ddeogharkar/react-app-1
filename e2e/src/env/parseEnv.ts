export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
  //logger.log("process curr work dir :",process.cwd() + " path : ",path)
  return require(`${process.cwd()}${path}`);
};

export const env = (key: string): string => {
  const value = process.env[key]
  //logger.log("value ",value)
  if (!value) {
    throw Error(`No environment variable found for ${key}`)
  }
  return value;
}

export const envNumber = (key: string): number => {
  //logger.log("env number ", Number(env(key)))
  return Number(env(key));
};

