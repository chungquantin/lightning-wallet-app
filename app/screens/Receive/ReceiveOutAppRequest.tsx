import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./ReceiveOutAppRequest.style"

export const ReceiveOutAppRequestScreen = observer(function ReceiveOutAppRequestScreen() {
  return (
    <View testID="ReceiveOutAppRequestScreen" style={Style.Container}>
      <Screen>
        <Text>ReceiveOutAppRequest</Text>
      </Screen>
    </View>
  )
})
