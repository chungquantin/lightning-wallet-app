import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Withdraw.style"

export const WithdrawScreen = observer(function WithdrawScreen() {
  return (
    <View testID="WithdrawScreen" style={Style.Container}>
      <Screen>
        <Text>History</Text>
      </Screen>
    </View>
  )
})
