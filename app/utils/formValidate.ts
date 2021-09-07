/**
 * @function formValidate
 * @description Validate form values
 * @param {Object} formValues - An object `{ [key:string]: string }`
 * @param {Object} validations - An object `{ [key:string]: Array[]({ fn: function(formValues[key]) => Boolean, error: string }) }`
 * @example
 * const formValues = {
 *     emailAddress: 'emailaddressgmail.com',
 *     password: '123'
 * };
 * const validations = {
 *     emailAddress: [{ fn: 'email', error: 'Invalid email' }],
 *     password: [
 *         { fn: 'minLength', error: 'Length not enough' },
 *         { fn: 'maxLength', error: 'Too long' }
 *     ],
 * };
 *
 * formValidate(formValues, validation)
 * => { valid: false, errors: { emailAddress: 'Invalid email', password: 'Length not enough' } }
 * @returns {Object} Return an object with format `{ valid: Boolean, errors: { [key:string]: error } }`
 */
const formValidate = (formValues, validations) => {
  let valid = true
  const errors = {}

  try {
    if (!formValues || !validations) {
      throw new Error("Wrong inputs format")
    }

    Object.keys(validations).forEach((key) => {
      if (!validations[key] || !validations[key].length) {
        throw new Error(`Validation of "${key}" not found`)
      }

      validations[key].forEach(({ fn, error }) => {
        if (!fn) {
          throw new Error(`Function validate of "${key}" not found`)
        }
        if (!error) {
          throw new Error(`Error message of "${key}" not found`)
        }

        if (!fn(formValues[key], formValues)) {
          if (errors[key]) return
          valid = false
          errors[key] = error
        }
      })
    })
  } catch (e) {
    valid = false
    console.error(e) // eslint-disable-line no-console
  }

  return { valid, errors }
}

export default formValidate
