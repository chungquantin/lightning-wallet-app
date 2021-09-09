import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Splash.style"

export const SplashScreen = observer(function SplashScreen() {
  return (
    <View testID="SplashScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>Splash Screen</Text>
      </Screen>
    </View>
  )
})
