import React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { Text } from "../../components"
import { formatUnixDate } from "../../utils/date"
import getSymbolFromCurrency from "currency-symbol-map"
import { TouchableRipple } from "react-native-paper"
import { Style } from "./TransactionItem.style"
import { GestureResponderEvent } from "react-native"
import { useStores } from "../../models"
import { RequestedTransaction } from "../../models/requested-transaction/requested-transaction"

interface Props {
  transaction: Partial<RequestedTransaction>
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
        {transaction.type && (
          <View
            style={{
              backgroundColor:
                transaction.type === "SEND" ? color.palette.orange : color.palette.green,
              height: "100%",
              width: 3,
              marginRight: 15,
              marginLeft: -10,
              borderRadius: 20,
            }}
          />
        )}
        <View style={{ flex: 3 }}>
          <Text style={Style.Header}>
            {transaction.description.length > 20
              ? `${transaction.description.slice(0, 17).trim()}...`
              : transaction.description}
          </Text>
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
            {(
              transaction.type
                ? transaction.fromWalletId === walletStore.wallet.id
                : transaction.toWalletId === walletStore.wallet.id
            ) ? (
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
