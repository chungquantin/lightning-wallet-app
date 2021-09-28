import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Notification.style"

export const NotificationScreen = observer(function NotificationScreen() {
  return (
    <View testID="NotificationScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>Notification Screen</Text>
      </Screen>
    </View>
  )
})
