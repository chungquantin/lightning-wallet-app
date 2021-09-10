import React from "react"
import { Alert, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"
import { color } from "../../theme"
import I18n from "i18n-js"
import { ActivityIndicator, Button, TouchableRipple } from "react-native-paper"
import { useNavigation } from "@react-navigation/core"
import useFormValidation from "../../hooks/useFormValidation"
import { InputField } from "./InputField"
import signUpValidate from "./SignUp.validate"
import { useStores } from "../../models"

export const SignUpScreen = observer(function SignUpScreen() {
  const [loading, setLoading] = React.useState(false)
  const { authStore } = useStores()
  const navigator = useNavigation()
  type FormProps = {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
  }
  const {
    formValues,
    handleSetFieldValue,
    handleSubmit,
    handleResetFieldError,
    errors,
    translateError,
  } = useFormValidation<FormProps>(
    {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    signUpValidate as any,
  )
  const handler = {
    SignUp: () =>
      handleSubmit((formValues) => {
        setLoading(true)
        authStore
          .register({
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            avatar: "",
            password: formValues.password,
            phoneNumber: Math.floor(Math.random() * (10000000 - 99999999 + 1)) + 10000000 + "",
          })
          .then((result) => {
            setLoading(false)
            if (!result.success && result.errors.length !== 0) {
              Alert.alert(result.errors[0].message)
            }
            if (result.success) {
              Alert.alert(I18n.t("common.auth.register"), I18n.t("common.alert.accountIsCreated"), [
                {
                  text: "Go to Sign in",
                  onPress: () => navigator.navigate("SignIn"),
                },
              ])
            }
          })
      }),
    GoToSignIn: () => navigator.navigate("SignIn"),
  }
  return (
    <View testID="SignUpScreen" style={{ ...Style.Container }}>
      <Screen unsafe={true} preset="scroll">
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
            value={formValues.firstName}
            icon="person"
            txLabel="common.form.firstName.label"
            txPlaceholder="common.form.firstName.placeholder"
            onFocusHandler={() => handleResetFieldError("firstName")}
            onChangeHandler={(text) => handleSetFieldValue("firstName", text)}
            error={translateError(errors !== {} ? (errors as FormProps).firstName : "")}
          />
          <InputField
            isPassword={false}
            value={formValues.lastName}
            icon="person"
            txLabel="common.form.lastName.label"
            txPlaceholder="common.form.lastName.placeholder"
            onFocusHandler={() => handleResetFieldError("lastName")}
            onChangeHandler={(text) => handleSetFieldValue("lastName", text)}
            error={translateError(errors !== {} ? (errors as FormProps).lastName : "")}
          />
          <InputField
            isPassword={false}
            value={formValues.email}
            icon="mail"
            txLabel="common.form.email.label"
            txPlaceholder="common.form.email.placeholder"
            onFocusHandler={() => handleResetFieldError("email")}
            onChangeHandler={(text) => handleSetFieldValue("email", text)}
            error={translateError(errors !== {} ? (errors as FormProps).email : "")}
          />
          <InputField
            isPassword={true}
            value={formValues.password}
            icon="lock-closed"
            txLabel="common.form.password.label"
            txPlaceholder="common.form.password.placeholder"
            onFocusHandler={() => handleResetFieldError("password")}
            onChangeHandler={(text) => handleSetFieldValue("password", text)}
            error={translateError(errors !== {} ? (errors as FormProps).password : "")}
          />
          <InputField
            isPassword={true}
            value={formValues.confirmPassword}
            icon="lock-closed"
            txLabel="common.form.confirmPassword.label"
            txPlaceholder="common.form.confirmPassword.placeholder"
            onFocusHandler={() => handleResetFieldError("confirmPassword")}
            onChangeHandler={(text) => handleSetFieldValue("confirmPassword", text)}
            error={translateError(errors !== {} ? (errors as FormProps).confirmPassword : "")}
          />
          <Button
            onPress={handler.SignUp}
            style={{ ...Style.Button, marginTop: 50 }}
            color={color.text}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color={color.palette.deepPurple}
                style={Style.Indicator}
              />
            ) : (
              <Text>{I18n.t("common.auth.signUp")}</Text>
            )}
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
