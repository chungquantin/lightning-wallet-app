import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./SendInAppRequest.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Calculator } from "../Calculator"
import { color } from "../../theme"
import { User } from "../../models/user/user"

interface SendInAppUserRouteProps extends ParamListBase {
  UserDetail: {
    user: User
  }
}

export const SendInAppRequestScreen = observer(function SendInAppRequestScreen() {
  const route = useRoute<RouteProp<SendInAppUserRouteProps, "UserDetail">>()
  const { user } = route.params
  const navigator = useNavigation()

  const handler = {
    Next: () =>
      navigator.navigate("TransactionConfirm", {
        amount: 0,
        user,
        currency: user.defaultCurrency,
      }),
  }
  return (
    <View testID="SendInAppRequestScreen" style={Style.Container}>
      <Screen>
        <Text>User ID: {user.id}</Text>
        <Calculator />
        <View style={{ flex: 1 }}>
          <Button style={{ backgroundColor: color.primary }} onPress={handler.Next}>
            <Text tx="common.next" />
          </Button>
        </View>
      </Screen>
    </View>
  )
})
