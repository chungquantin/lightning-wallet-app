import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./ReceiveInAppUser.style"
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native"

interface ReceiveInAppUserRouteProps extends ParamListBase {
  UserDetail: {
    userId: string
  }
}

export const ReceiveInAppUserScreen = observer(function ReceiveInAppUserScreen() {
  const route = useRoute<RouteProp<ReceiveInAppUserRouteProps, "UserDetail">>()
  const { userId } = route.params

  return (
    <View testID="ReceiveInAppUserScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {userId}</Text>
      </Screen>
    </View>
  )
})
