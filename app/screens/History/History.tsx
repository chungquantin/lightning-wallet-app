import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./History.style"

export const HistoryScreen = observer(function HistoryScreen() {
  return (
    <View testID="HistoryScreen" style={Style.Container}>
      <Screen>
        <Text>History</Text>
      </Screen>
    </View>
  )
})
