import { useNavigation } from "@react-navigation/native"
import { NavigatorParamEnum } from "../navigators"

/**
 * @function useCustomNavigation
 * @description A custom hook used for managing and validating form values
 * @param {*} initialFormValues - initial form values
 * @param {Function} validate - Optional. A function validate form values `(formValues) => { valid: Boolean, errors: { [key:string]: error } }`
 */
function useCustomNavigation() {
  const navigator = useNavigation()

  const navigate = <P extends object>(route: NavigatorParamEnum, params?: P) =>
    navigator.navigate(route, params)

  return {
    navigate,
  }
}

export default useCustomNavigation
