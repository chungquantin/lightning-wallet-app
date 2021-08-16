import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./TransactionDetail.style"
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native"
import { Transaction } from "../models/transaction/transaction"

interface TransactionDetailRouteProps extends ParamListBase {
  TransactionDetail: {
    transaction: Transaction
  }
}

export const TransactionDetailScreen = observer(function TransactionDetailScreen() {
  const route = useRoute<RouteProp<TransactionDetailRouteProps, "TransactionDetail">>()
  const { transaction } = route.params
  return (
    <View testID="TransactionDetailScreen" style={Style.Container}>
      <Screen>
        <Text>Description: {transaction.description}</Text>
      </Screen>
    </View>
  )
})
