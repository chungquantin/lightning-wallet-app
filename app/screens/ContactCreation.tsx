import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./ContactCreation.style"

export const ContactCreationScreen = observer(function ContactCreationScreen() {
  return (
    <View testID="ContactCreationScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text>ContactCreation Screen</Text>
      </Screen>
    </View>
  )
})
