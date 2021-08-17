import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import Style from "./TransactionConfirm.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"

interface TransactionConfirmRouteProps extends ParamListBase {
  TransactionDetail: {
    user: User
    amount: number
    currency: string
  }
}

export const TransactionConfirmScreen = observer(function TransactionConfirmScreen() {
  const route = useRoute<RouteProp<TransactionConfirmRouteProps, "TransactionDetail">>()
  const { user, amount, currency } = route.params
  const navigator = useNavigation()

  const handler = {
    Confirm: () => navigator.navigate("TransactionComplete", route.params),
  }
  return (
    <View testID="TransactionConfirmScreen" style={Style.Container}>
      <Screen>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
        <Text>{`${amount}`}</Text>
        <Text>{`${currency}`}</Text>
        <View style={{ flex: 1 }}>
          <Button onPress={handler.Confirm}>
            <Text tx="common.confirm" />
          </Button>
        </View>
      </Screen>
    </View>
  )
})
