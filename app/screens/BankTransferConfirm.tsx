import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./BankTransferConfirm.style"

export const BankTransferConfirmScreen = observer(function BankTransferConfirmScreen() {
  return (
    <View testID="BankTransferConfirmScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>BankTransferConfirm Screen</Text>
      </Screen>
    </View>
  )
})
