import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Receive.style"

export const ReceiveScreen = observer(function ReceiveScreen() {
  return (
    <View testID="ReceiveScreen" style={Style.Container}>
      <Screen>
        <Text>History</Text>
      </Screen>
    </View>
  )
})
