import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Send.style"

export const SendScreen = observer(function SendScreen() {
  return (
    <View testID="SendScreen" style={Style.Container}>
      <Screen>
        <Text>History</Text>
      </Screen>
    </View>
  )
})
