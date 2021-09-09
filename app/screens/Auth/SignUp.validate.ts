import { formValidateUtil, validationUtil } from "../../utils"

const validations = {
  firstName: [{ fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" }],
  lastName: [{ fn: validationUtil.require, error: "FORM_VALIDATION_REQUIRED" }],
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
      error: "FORM_VALIDATION_PASSWORD_REGEX",
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
