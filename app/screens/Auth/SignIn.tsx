import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"
import { color } from "../../theme"
import { Button, TouchableRipple } from "react-native-paper"
import { useNavigation } from "@react-navigation/core"
import useFormValidation from "../../hooks/useFormValidation"
import { InputField } from "./InputField"

export const SignInScreen = observer(function SignInScreen() {
  const navigator = useNavigation()
  type FormProps = {
    email: string
    password: string
  }
  const { formValues, handleSetFieldValue, handleSubmit, translateError, errors } =
    useFormValidation<FormProps>({
      email: "",
      password: "",
    })
  const handler = {
    SignIn: () => handleSubmit((formValues) => console.log(formValues)),
    GoToSignUp: () => navigator.navigate("SignUp"),
  }
  return (
    <View testID="SignInScreen" style={{ ...Style.Container }}>
      <Screen>
        <View
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={Style.Header} tx="common.welcome" />
          <Text style={Style.SubHeader} tx="common.auth.signInToContinue" />
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
          <View
            style={{
              ...Style.InputField,
              backgroundColor: color.transparent,
              paddingHorizontal: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: color.palette.offGray,
                  fontWeight: "bold",
                  fontSize: 13,
                }}
                tx="common.auth.forgotPassword"
              />
            </View>
          </View>
          <Button onPress={handler.SignIn} style={Style.Button} color={color.text}>
            <Text tx="common.auth.signIn" />
          </Button>
          <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
            <Text
              style={{
                color: color.palette.offGray,
                fontSize: 13,
              }}
              tx="common.auth.signInToContinue"
            />
            <TouchableRipple onPress={handler.GoToSignUp}>
              <Text
                style={{
                  color: color.palette.purple,
                  fontWeight: "bold",
                  fontSize: 13,
                  marginLeft: 5,
                }}
                tx="common.auth.registerNow"
              />
            </TouchableRipple>
          </View>
        </View>
      </Screen>
    </View>
  )
})
