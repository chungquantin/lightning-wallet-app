import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Auth.style"

export const AuthScreen = observer(function AuthScreen() {
  return (
    <View testID="AuthScreen" style={Style.Container}>
      <Screen>
        <Text>Authenticate</Text>
      </Screen>
    </View>
  )
})
