import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import Style from "./TransactionComplete.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"

interface TransactionCompleteRouteProps extends ParamListBase {
  TransactionDetail: {
    user: User
    amount: number
    currency: string
  }
}

export const TransactionCompleteScreen = observer(function TransactionCompleteScreen() {
  const route = useRoute<RouteProp<TransactionCompleteRouteProps, "TransactionDetail">>()
  const { user, amount, currency } = route.params
  const navigator = useNavigation()

  const handler = {
    Done: () => navigator.navigate("Wallet"),
  }

  return (
    <View testID="TransactionCompleteScreen" style={Style.Container}>
      <Screen>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
        <Text>{`${amount}`}</Text>
        <Text>{`${currency}`}</Text>
        <View style={{ flex: 1 }}>
          <Button onPress={handler.Done}>
            <Text tx="common.done" />
          </Button>
        </View>
      </Screen>
    </View>
  )
})
