import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./Profile.style"
import { Avatar } from "react-native-paper"
import { useStores } from "../../models"
import { color } from "../../theme"

export const ProfileScreen = observer(function ProfileScreen() {
  const { userStore } = useStores()
  const currentUser = userStore.user
  const handler = {
    Logout: () => {},
  }
  return (
    <View testID="ProfileScreen" style={Style.Container}>
      <Screen preset="scroll">
        <View style={Style.ProfileInfoContainer}>
          <Avatar.Image
            source={{
              uri: currentUser.avatar,
            }}
            size={60}
          />
          <View style={Style.ProfileMetaContainer}>
            <Text
              style={Style.ProfileName}
            >{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
            <Text style={Style.ProfileSubheader}>{currentUser.email}</Text>
          </View>
        </View>
        <Button
          onPress={handler.Logout}
          style={{ backgroundColor: color.primary, marginTop: 50 }}
          textStyle={{ fontSize: 13 }}
          tx="common.auth.logout"
        />
      </Screen>
    </View>
  )
})
