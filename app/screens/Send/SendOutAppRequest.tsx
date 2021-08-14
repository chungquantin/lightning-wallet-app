import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./SendOutAppRequest.style"

export const SendOutAppRequestScreen = observer(function SendOutAppRequestScreen() {
  return (
    <View testID="SendOutAppRequestScreen" style={Style.Container}>
      <Screen>
        <Text>SendOutAppRequest</Text>
      </Screen>
    </View>
  )
})
