import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Contact.style"

export const ContactScreen = observer(function ContactScreen() {
  return (
    <View testID="ContactScreen" style={Style.Container}>
      <Screen>
        <Text>Contact</Text>
      </Screen>
    </View>
  )
})
