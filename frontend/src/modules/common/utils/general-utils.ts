export const isString = (x: unknown) => {
  return Object.prototype.toString.call(x) === "[object String]"
}

export const getStringQueryParam = (val: string | string[]) =>
  Array.isArray(val) ? val[0] : val
