import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"

export const SignUpScreen = observer(function SignUpScreen() {
  return (
    <View testID="SignUpScreen" style={Style.Container}>
      <Screen>
        <Text>SignUp</Text>
      </Screen>
    </View>
  )
})
