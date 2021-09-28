import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Setting.style"

export const SettingScreen = observer(function SettingScreen() {
  return (
    <View testID="SettingScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>Setting Screen</Text>
      </Screen>
    </View>
  )
})
