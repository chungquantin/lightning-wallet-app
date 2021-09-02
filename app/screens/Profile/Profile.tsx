import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Profile.style"

export const ProfileScreen = observer(function ProfileScreen() {
  return (
    <View testID="ProfileScreen" style={Style.Container}>
      <Screen>
        <Text>Profile</Text>
      </Screen>
    </View>
  )
})
