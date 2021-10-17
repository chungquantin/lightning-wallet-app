import { formValidateUtil, validationUtil } from "../../utils"

const validations = {
  username: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    { fn: validationUtil.username, error: "FORM_VALIDATION_USERNAME" },
  ],
  firstName: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    {
      fn: validationUtil.notContainNumber,
      error: "FORM_VALIDATION_NAME_HAS_NUMBER",
    },
  ],
  lastName: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    {
      fn: validationUtil.notContainNumber,
      error: "FORM_VALIDATION_NAME_HAS_NUMBER",
    },
  ],
  email: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    { fn: validationUtil.email, error: "FORM_VALIDATION_EMAIL_INVALID" },
  ],
  password: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    {
      fn: (password) => validationUtil.minLength(password, 6),
      error: "FORM_VALIDATION_PASSWORD_MIN_LENGTH",
    },
    {
      fn: (password) => validationUtil.password(password),
      error: "FORM_VALIDATION_PASSWORD_INVALID",
    },
  ],
  confirmPassword: [
    { fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" },
    {
      fn: (confirmPassword, formValues) => confirmPassword === formValues.password,
      error: "FORM_VALIDATION_CONFIRM_PASSWORD_NOT_MATCH",
    },
  ],
}
const signUpValidate = (formValues) => formValidateUtil(formValues, validations)

export default signUpValidate
