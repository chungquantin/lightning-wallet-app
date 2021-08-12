import React from "react"
import { GestureResponderEvent, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./Wallet.style"
import { useStores } from "../../models"
import { onSnapshot } from "mobx-state-tree"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { TransactionItem } from "../TransactionItem"
import { FlatList } from "react-native-gesture-handler"
import { color } from "../../theme"
import getSymbolFromCurrency from "currency-symbol-map"
import { TxKeyPath } from "../../i18n"
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

interface ButtonProps {
  onPressHandler: (event: GestureResponderEvent) => void
  tx: TxKeyPath
  children: JSX.Element
}

const CustomButton = ({ onPressHandler, tx, children }: ButtonProps) => {
  return (
    <View style={Style.ButtonContainer}>
      <Button onPress={onPressHandler} style={Style.Button}>
        {children}
      </Button>
      <Text style={Style.ButtonLabel} tx={tx} />
    </View>
  )
}

export const WalletScreen = observer(function WalletScreen() {
  const { transactionStore } = useStores()
  const transaction = transactionStore.transactions
  const navigator = useNavigation()

  onSnapshot(transactionStore.transactions, (snapshot) => {
    transaction.replace(snapshot)
  })

  useFocusEffect(
    React.useCallback(() => {
      transactionStore.fetchTransactions()
    }, []),
  )

  const handler = {
    Send: () => navigator.navigate("Send"),
    Receive: () => navigator.navigate("Receive"),
    Withdraw: () => navigator.navigate("Withdraw"),
    Deposit: () => navigator.navigate("Deposit"),
  }

  return (
    <View testID="WalletScreen" style={Style.Container}>
      <Screen preset="fixed">
        <View style={Style.TopContainer}>
          <View style={Style.TopContainerStart}>
            <Text tx="wallet.balance" style={Style.TopContainerText} />
            <Text style={Style.TopContainerText}>USD</Text>
          </View>
          <View style={Style.TopContainerCenter}>
            <Text style={Style.BalanceText}>{getSymbolFromCurrency("USD")}18,000.00</Text>
            <Text style={Style.BalanceRate}>+12.00%</Text>
          </View>
          <View style={Style.TopContainerEnd}>
            <CustomButton onPressHandler={handler.Send} tx="common.send">
              <FontAwesome5 name="donate" color={color.palette.offWhite} size={20} />
            </CustomButton>
            <CustomButton onPressHandler={handler.Receive} tx="common.receive">
              <FontAwesome5 name="hand-holding-usd" color={color.palette.offWhite} size={20} />
            </CustomButton>
            <CustomButton onPressHandler={handler.Deposit} tx="common.deposit">
              <MaterialCommunityIcons
                name="bank-transfer-out"
                color={color.palette.offWhite}
                size={30}
              />
            </CustomButton>
            <CustomButton onPressHandler={handler.Withdraw} tx="common.withdraw">
              <MaterialCommunityIcons
                name="bank-transfer-in"
                color={color.palette.offWhite}
                size={30}
              />
            </CustomButton>
          </View>
        </View>
        <View style={Style.BottomContainer}>
          <Text tx="common.transaction" style={Style.BottomHeader} />
          <Text style={{ marginBottom: 20 }}>
            <Text style={Style.BottomSubheader} tx="wallet.total-transactions" />
            <Text style={Style.BottomSubheader}>: {transaction.length}</Text>
          </Text>
          <FlatList
            data={transaction}
            renderItem={({ item, index }) => (
              <TransactionItem
                transaction={item}
                style={
                  index === transaction.length - 1 && {
                    borderBottomColor: color.transparent,
                    marginBottom: 30,
                  }
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Screen>
    </View>
  )
})
