import React from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { color } from "../../theme"

export const NormalSpinner = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -30 }}>
      <ActivityIndicator color={color.palette.purple} size={40} />
    </View>
  )
}
