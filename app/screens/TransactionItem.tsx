import React from "react"
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, textStyle } from "../theme"
import { Text } from "../components"
import { Transaction } from "../models/transaction/Transaction"
import { formatUnixDate } from "../utils/date"
import getSymbolFromCurrency from "currency-symbol-map"
import { TouchableRipple } from "react-native-paper"

interface Props {
  transaction: Partial<Transaction>
  style: ViewStyle
}

const { width, height } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    paddingHorizontal: width / 13,
    backgroundColor: color.transparent,
    marginTop: height / 55,
    paddingBottom: height / 55,
    flex: 1,
    flexDirection: "row",
    borderBottomColor: color.borderLight,
    borderBottomWidth: 1,
  },
  MiddleContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  Header: {
    fontSize: textStyle.normalSize,
    marginBottom: 3,
    color: color.text,
    fontFamily: textStyle.secondaryFont,
  },
  Subheader: {
    fontSize: textStyle.smallSize,
    color: color.palette.offGray,
    fontFamily: textStyle.secondaryFont,
  },
  TransactionAmount: {
    fontSize: textStyle.normalSize,
    fontWeight: "bold",
    fontFamily: textStyle.secondaryFontBold,
  },
})

export const TransactionItem = observer(function TransactionItem({ transaction, style }: Props) {
  return (
    <TouchableRipple onPress={() => {}}>
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
            {transaction.type === "IN" ? (
              <Text style={{ ...Style.TransactionAmount, color: color.primary }}>
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
