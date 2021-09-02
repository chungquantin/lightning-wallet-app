import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./UserDetail.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"

<<<<<<< HEAD
interface UserDetailRouteProps extends ParamListBase {
=======
interface UserDetailScreen extends ParamListBase {
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637
  UserDetail: {
    user: User
  }
}

export const UserDetailScreen = observer(function UserDetailScreen() {
<<<<<<< HEAD
  const route = useRoute<RouteProp<UserDetailRouteProps, "UserDetail">>()
  const navigator = useNavigation()
  const { user } = route.params
  React.useEffect(() => {
    if (user) {
      navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })
    }
  }, [user])
=======
  const route = useRoute<RouteProp<UserDetailScreen, "UserDetail">>()
  const navigator = useNavigation()
  const { user } = route.params
  navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637

  return (
    <View testID="UserDetailScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {user.id}</Text>
      </Screen>
    </View>
  )
})
