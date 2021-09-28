import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./BankAccountDetail.style"

export const BankAccountDetailScreen = observer(function BankAccountDetailScreen() {
  return (
    <View testID="BankAccountDetailScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>BankAccountDetail Screen</Text>
      </Screen>
    </View>
  )
})
