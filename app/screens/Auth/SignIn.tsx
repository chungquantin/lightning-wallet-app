import React from "react"
import { Alert, Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { AutoImage, Screen, Text } from "../../components"
import Style from "./Auth.style"
import { color } from "../../theme"
import { ActivityIndicator, Button, TouchableRipple } from "react-native-paper"
import { useNavigation } from "@react-navigation/core"
import useFormValidation from "../../hooks/useFormValidation"
import { InputField } from "./InputField"
import signInValidate from "./SignIn.validate"
import { useStores } from "../../models"
import I18n from "i18n-js"
import { clear } from "../../utils/storage"
// import AsyncStorage from "@react-native-async-storage/async-storage"

const NeutronPayHorizontal = require("../../../assets/images/logos/neutronpay-row-logo.png")

export const SignInScreen = observer(function SignInScreen() {
  const [loading, setLoading] = React.useState(false)
  const { userStore, walletStore } = useStores()
  const navigator = useNavigation()
  type FormProps = {
    emailAddress: string
    password: string
  }
  const {
    formValues,
    handleSetFieldValue,
    handleSubmit,
    handleResetFieldError,
    translateError,
    errors,
  } = useFormValidation<FormProps>(
    {
      emailAddress: "",
      password: "",
    },
    signInValidate as any,
  )

  // console.log(
  //   "ASYNC STORAGE",
  //   (async () => {
  //     const data = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())
  //     return data
  //   })(),
  // )

  const handler = {
    SignIn: () =>
      handleSubmit(async (formValues: any) => {
        try {
          clear()
          setLoading(true)
          const result = await userStore.login({
            email: formValues.emailAddress,
            password: formValues.password,
          })
          if (!result.success && result.errors.length !== 0) {
            Alert.alert(result.errors[0].message)
          } else {
            userStore.fetchCurrentUser()
            walletStore.fetchCurrentUserWallet()
            setLoading(false)
          }
        } catch (err) {
          setLoading(false)
          Alert.alert(err.message)
        }
      }),
    GoToSignUp: () => navigator.navigate("SignUp"),
  }
  return (
    <View testID="SignInScreen" style={{ ...Style.Container }}>
      <Screen>
        <View style={Style.InnerContainer}>
          <View style={Style.ImageContainer}>
            <AutoImage
              style={{
                resizeMode: "contain",
              }}
              width={Dimensions.get("screen").width - 90}
              height={40}
              source={NeutronPayHorizontal}
            />
          </View>
          <Text style={Style.Header} tx="common.welcome" />
          <Text style={Style.SubHeader} tx="common.auth.signInToContinue" />
          <InputField
            isPassword={false}
            style={{ marginTop: 30 }}
            value={formValues.emailAddress}
            icon="mail"
            txLabel="common.form.email.label"
            txPlaceholder="common.form.email.placeholder"
            onFocusHandler={() => handleResetFieldError("emailAddress")}
            onChangeHandler={(text) => handleSetFieldValue("emailAddress", text)}
            error={translateError(errors !== {} ? (errors as FormProps).emailAddress : "")}
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
          <Button
            disabled={loading}
            onPress={handler.SignIn}
            style={{ ...Style.Button }}
            color={color.text}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color={color.palette.deepPurple}
                style={Style.Indicator}
              />
            ) : (
              <Text>{I18n.t("common.auth.signIn")}</Text>
            )}
          </Button>
          <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
            <Text
              style={{
                color: color.palette.offGray,
                fontSize: 13,
              }}
              tx="common.auth.noAccount"
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
