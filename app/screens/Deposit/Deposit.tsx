import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Deposit.style"

export const DepositScreen = observer(function DepositScreen() {
  return (
    <View testID="DepositScreen" style={Style.Container}>
      <Screen>
        <Text>History</Text>
      </Screen>
    </View>
  )
})
