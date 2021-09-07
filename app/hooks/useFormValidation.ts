import { useState } from "react"
import i18n from "i18n-js"

/**
 * @function useFormValidation
 * @description A custom hook used for managing and validating form values
 * @param {*} initialFormValues - initial form values
 * @param {Function} validate - Optional. A function validate form values `(formValues) => { valid: Boolean, errors: { [key:string]: error } }`
 */
function useFormValidation<S = {}>(
  initialFormValues: S,
  validate = (formValues) => ({ valid: true, errors: [] }),
) {
  const [errors, setErrors] = useState<S | {}>({})
  const [formValues, setFormValues] = useState<S>(initialFormValues)

  const translateError = (message) => (message ? i18n.t(message) : "")

  const handleSetFieldValue = (name, value) => {
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSetMultipleFieldValues = (newFieldValues) => {
    setFormValues({ ...formValues, ...newFieldValues })
  }

  const handleResetFormValues = () => {
    setFormValues(initialFormValues)
    setErrors({})
  }

  const handleResetFieldError = (name) => {
    setErrors({ ...errors, [name]: "" })
  }

  const handleSubmit = (callback) => {
    const validation = validate(formValues)
    if (validation.valid) {
      callback(formValues)
    } else {
      setErrors(validation.errors)
    }
  }

  return {
    valid: validate(formValues).valid,
    formValues,
    setFormValues,
    errors,
    setErrors,
    translateError,
    handleSetFieldValue,
    handleSetMultipleFieldValues,
    handleResetFormValues,
    handleResetFieldError,
    handleSubmit,
  }
}

export default useFormValidation
