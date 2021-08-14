import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./SendInAppRequest.style"
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native"

interface SendInAppUserRouteProps extends ParamListBase {
  UserDetail: {
    userId: string
  }
}

export const SendInAppRequestScreen = observer(function SendInAppRequestScreen() {
  const route = useRoute<RouteProp<SendInAppUserRouteProps, "UserDetail">>()
  const { userId } = route.params

  return (
    <View testID="SendInAppRequestScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {userId}</Text>
      </Screen>
    </View>
  )
})
