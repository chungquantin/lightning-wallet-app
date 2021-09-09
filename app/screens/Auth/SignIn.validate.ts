import { formValidateUtil, validationUtil } from "../../utils"

const validations = {
  emailAddress: [
    {
      fn: validationUtil.require,
      error: "FORM_VALIDATION_REQUIRED",
    },
    {
      fn: validationUtil.email,
      error: "FORM_VALIDATION_EMAIL_INVALID",
    },
  ],
  password: [
    {
      fn: validationUtil.require,
      error: "FORM_VALIDATION_REQUIRED",
    },
  ],
}
const signInValidate = (formValues) => formValidateUtil(formValues, validations)

export default signInValidate
