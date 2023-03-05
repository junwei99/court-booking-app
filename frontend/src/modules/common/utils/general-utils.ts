export const isString = (x: unknown) => {
  return Object.prototype.toString.call(x) === "[object String]"
}

export const getStringQueryParam = (val: string | string[]) =>
  Array.isArray(val) ? val[0] : val

export const getObjectKeys = <TObj extends Object>(
  obj: TObj
): (keyof TObj)[] => {
  return Object.keys(obj) as (keyof TObj)[]
}

export const getObjectEntries = <TObj extends Object>(
  obj: TObj
): [keyof TObj, TObj[keyof TObj]][] => {
  return Object.entries(obj) as [keyof TObj, TObj[keyof TObj]][]
}
