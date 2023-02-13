export const isStrValueNumeric = (value: string) => {
  return /^-?\d+$/.test(value)
}
