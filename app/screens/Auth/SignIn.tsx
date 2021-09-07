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

export const SignInScreen = observer(function SignInScreen() {
  const navigator = useNavigation()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    email: string
    password: string
  }>({
    email: "",
    password: "",
  })
  const handler = {
    SignIn: () => {},
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
          <View
            style={{
              ...Style.InputField,
              marginTop: 30,
            }}
          >
            <View>
              <Ionicons style={Style.Icon} name="mail" size={15} color={color.palette.offGray} />
            </View>
            <View>
              <Text style={Style.InputLabel} tx="common.form.email.label" />
              <TextInput
                placeholderTextColor={color.palette.offGray}
                placeholder={I18n.t("common.form.email.placeholder")}
                onChangeText={(text) => handleSetFieldValue("email", text)}
                value={formValues.email}
              />
            </View>
          </View>
          <View
            style={{
              ...Style.InputField,
            }}
          >
            <View>
              <Ionicons
                style={Style.Icon}
                name="lock-closed"
                size={15}
                color={color.palette.offGray}
              />
            </View>
            <View>
              <Text style={Style.InputLabel} tx="common.form.password.label" />
              <TextInput
                secureTextEntry={true}
                placeholderTextColor={color.palette.offGray}
                placeholder={I18n.t("common.form.password.placeholder")}
                onChangeText={(text) => handleSetFieldValue("password", text)}
                value={formValues.password}
              />
            </View>
          </View>
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
