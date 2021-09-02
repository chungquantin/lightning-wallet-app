import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"

export const SignInScreen = observer(function SignInScreen() {
  return (
    <View testID="SignInScreen" style={Style.Container}>
      <Screen>
        <Text>SignIn</Text>
      </Screen>
    </View>
  )
})
