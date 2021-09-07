import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { Ionicons } from "@expo/vector-icons"
import { Button, TouchableRipple } from "react-native-paper"
import { useNavigation } from "@react-navigation/core"
import useFormValidation from "../../hooks/useFormValidation"
import { InputField } from "./InputField"

export const SignUpScreen = observer(function SignUpScreen() {
  const navigator = useNavigation()
  type FormProps = {
    email: string
    password: string
    confirmPassword: string
  }
  const { formValues, handleSetFieldValue, handleSubmit, errors, translateError } =
    useFormValidation<FormProps>({
      email: "",
      password: "",
      confirmPassword: "",
    })
  const handler = {
    SignUp: () => handleSubmit((formValues) => console.log(formValues)),
    GoToSignIn: () => navigator.navigate("SignIn"),
  }
  return (
    <View testID="SignUpScreen" style={{ ...Style.Container }}>
      <Screen unsafe={true}>
        <View
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={Style.Header} tx="common.auth.register" />
          <Text style={Style.SubHeader} tx="common.auth.createNewAccount" />
          <InputField
            isPassword={false}
            style={{ marginTop: 30 }}
            value={formValues.email}
            icon="mail"
            txLabel="common.form.email.label"
            txPlaceholder="common.form.email.placeholder"
            onChangeHandler={(text) => handleSetFieldValue("email", text)}
            error={translateError(errors !== {} ? (errors as FormProps).email : "")}
          />
          <InputField
            isPassword={true}
            value={formValues.password}
            icon="lock-closed"
            txLabel="common.form.password.label"
            txPlaceholder="common.form.password.placeholder"
            onChangeHandler={(text) => handleSetFieldValue("password", text)}
            error={translateError(errors !== {} ? (errors as FormProps).password : "")}
          />
          <InputField
            isPassword={true}
            value={formValues.confirmPassword}
            icon="lock-closed"
            txLabel="common.form.confirmPassword.label"
            txPlaceholder="common.form.confirmPassword.placeholder"
            onChangeHandler={(text) => handleSetFieldValue("confirmPassword", text)}
            error={translateError(errors !== {} ? (errors as FormProps).confirmPassword : "")}
          />
          <Button onPress={handler.SignUp} style={Style.Button} color={color.text}>
            {I18n.t("common.auth.signUp")}
          </Button>
          <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
            <Text
              style={{
                color: color.palette.offGray,
                fontSize: 13,
              }}
              tx="common.auth.haveAccount"
            />
            <TouchableRipple onPress={handler.GoToSignIn}>
              <Text
                style={{
                  color: color.palette.purple,
                  fontWeight: "bold",
                  fontSize: 13,
                  marginLeft: 5,
                }}
                tx="common.auth.signIn"
              />
            </TouchableRipple>
          </View>
        </View>
      </Screen>
    </View>
  )
})
