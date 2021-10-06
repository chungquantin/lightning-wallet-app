import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./BankTransferComplete.style"

export const BankTransferCompleteScreen = observer(function BankTransferCompleteScreen() {
  return (
    <View testID="BankTransferCompleteScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>BankTransferComplete Screen</Text>
      </Screen>
    </View>
  )
})
