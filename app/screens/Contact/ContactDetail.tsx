import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./ContactDetail.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../../models/user/user"

interface ContactDetailScreen extends ParamListBase {
  UserDetail: {
    user: User
  }
}

export const ContactDetailScreen = observer(function ContactDetailScreen() {
  const route = useRoute<RouteProp<ContactDetailScreen, "UserDetail">>()
  const navigator = useNavigation()
  const { user } = route.params
  navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })

  return (
    <View testID="ContactDetailScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {user.id}</Text>
      </Screen>
    </View>
  )
})
