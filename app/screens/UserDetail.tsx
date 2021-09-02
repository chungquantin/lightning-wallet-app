import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./UserDetail.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"

interface UserDetailRouteProps extends ParamListBase {
  UserDetail: {
    user: User
  }
}

export const UserDetailScreen = observer(function UserDetailScreen() {
  const route = useRoute<RouteProp<UserDetailRouteProps, "UserDetail">>()
  const navigator = useNavigation()
  const { user } = route.params
  React.useEffect(() => {
    if (user) {
      navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })
    }
  }, [user])

  return (
    <View testID="UserDetailScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {user.id}</Text>
      </Screen>
    </View>
  )
})
