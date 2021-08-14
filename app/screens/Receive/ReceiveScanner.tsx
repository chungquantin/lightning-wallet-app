import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./ReceiveScanner.style"

export const ReceiveScannerScreen = observer(function ReceiveScannerScreen() {
  return (
    <View testID="ReceiveScannerScreen" style={Style.Container}>
      <Screen>
        <Text>ReceiveScanner</Text>
      </Screen>
    </View>
  )
})
