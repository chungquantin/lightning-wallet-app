import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../components"
import Style from "./UserDetail.style"

export const Calculator = observer(function Calculator() {
  return (
    <View testID="Calculator" style={Style.Container}>
      <Text>Calculator</Text>
    </View>
  )
})
