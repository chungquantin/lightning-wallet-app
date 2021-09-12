export const setUndefinedAl = (object) =>
  Object.keys(object).forEach((i) => (object[i] = undefined))
