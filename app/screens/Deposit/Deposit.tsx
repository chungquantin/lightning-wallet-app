import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import Style from "./Deposit.style"

export const DepositScreen = observer(function DepositScreen() {
  return (
    <View testID="DepositScreen" style={Style.Container}>
      <Screen unsafe={true}></Screen>
    </View>
  )
})
