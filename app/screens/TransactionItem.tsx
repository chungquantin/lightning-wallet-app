import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../theme"
import { Text } from "../components"
import { Transaction } from "../models/transaction/transaction"
import { formatUnixDate } from "../utils/date"
import getSymbolFromCurrency from "currency-symbol-map"
import { TouchableRipple } from "react-native-paper"
import { Style } from "./TransactionItem.style"
import { GestureResponderEvent } from "react-native"
import { useStores } from "../models"

interface Props {
  transaction: Partial<Transaction>
  style?: ViewStyle
  onPressHandler?: (event: GestureResponderEvent) => void
}

export const TransactionItem = observer(function TransactionItem({
  transaction,
  style,
  onPressHandler,
}: Props) {
  const { walletStore } = useStores()
		
  return (
    <TouchableRipple onPress={onPressHandler}>
      <View key={transaction.id} testID="TransactionItem" style={{ ...Style.Container, ...style }}>
        <View style={{ flex: 3 }}>
          <Text style={Style.Header}>{transaction.description}</Text>
          <Text>
            <Text style={Style.Subheader} tx="time.date" />
            <Text style={Style.Subheader}>: {formatUnixDate(transaction.createdAt)}</Text>
          </Text>
        </View>
        <View style={{ flex: 1.5, ...Style.MiddleContainer }}>
          <Text style={Style.Subheader}>
            {transaction.status[0] + transaction.status.slice(1).toLowerCase()}
          </Text>
        </View>
        <View style={{ flex: 1.5, ...Style.MiddleContainer, alignItems: "flex-end" }}>
          <Text>
            {transaction.toWalletId === walletStore.wallet.id ? (
              <Text style={{ ...Style.TransactionAmount, color: color.palette.green }}>
                +{getSymbolFromCurrency(transaction.currency)}
                {transaction.amount}
              </Text>
            ) : (
              <Text style={{ ...Style.TransactionAmount, color: color.secondaryText }}>
                -{getSymbolFromCurrency(transaction.currency)}
                {transaction.amount}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  )
})
