const containLowerCharacter = (value) => new RegExp("^(?=.*[a-z])").test(value)
const containUpperCharacter = (value) => new RegExp("^(?=.*[A-Z])").test(value)
const containSpecialCharacter = (value) =>
  new RegExp("^(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])").test(value)
const containNumber = (value) => new RegExp("^(?=.*[0-9])").test(value)
const notContainNumber = (value) => !containNumber(value)
const length = (value, compareValue) => String(value).length === compareValue
const minLength = (value, min) => new RegExp(`^(?=.{${min},})`).test(value)
const maxLength = (value, max) => new RegExp(`^(?=.{0,${max}}$)`).test(value)
const min = (value, compareValue) => Number(value) >= compareValue
const max = (value, compareValue) => Number(value) <= compareValue
const require = (value) => value
const email = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
const password = (value) =>
  new RegExp(
    // eslint-disable-next-line max-len
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])(?=.{8,})",
  ).test(value)

export default {
  require,
  email,
  password,
  length,
  minLength,
  maxLength,
  min,
  max,
  notContainNumber,
  containNumber,
  containLowerCharacter,
  containUpperCharacter,
  containSpecialCharacter,
}
