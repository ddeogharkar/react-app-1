export const env=(key:string):string =>{
  const value = process.env[key]
  if(!value){
    throw Error(`No environment vriable found for ${key}`)
  }
  return value;
}
