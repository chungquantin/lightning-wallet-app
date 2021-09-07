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

export const SignUpScreen = observer(function SignUpScreen() {
  const navigator = useNavigation()
  const handler = {
    SignUp: () => {},
    GoToSignIn: () => navigator.navigate("SignIn"),
  }
  return (
    <View testID="SignUpScreen" style={{ ...Style.Container }}>
      <Screen>
        <View
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={Style.Header} tx="common.auth.register" />
          <Text style={Style.SubHeader} tx="common.auth.createNewAccount" />
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
                onChangeText={(text) => console.log("user", text)}
                value={""}
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
                placeholderTextColor={color.palette.offGray}
                placeholder={I18n.t("common.form.password.placeholder")}
                onChangeText={(text) => console.log("user", text)}
                value={""}
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
              <Text style={Style.InputLabel} tx="common.form.confirmPassword.label" />
              <TextInput
                placeholderTextColor={color.palette.offGray}
                placeholder={I18n.t("common.form.confirmPassword.placeholder")}
                onChangeText={(text) => console.log("user", text)}
                value={""}
              />
            </View>
          </View>
          <Button onPress={handler.SignUp} style={Style.Button} color={color.text}>
            {I18n.t("common.auth.signIn")}
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
