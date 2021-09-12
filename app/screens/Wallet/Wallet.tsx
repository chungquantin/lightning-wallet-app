import React from "react"
import { GestureResponderEvent, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./Wallet.style"
import { useStores } from "../../models"
import { onSnapshot } from "mobx-state-tree"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { TransactionItem } from "../TransactionItem"
import { color } from "../../theme"
import { TxKeyPath } from "../../i18n"
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { formatByUnit } from "../../utils/currency"
import { SectionList } from "react-native"
import { Transaction } from "../../models/transaction/transaction"

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
  const { transactionStore, walletStore } = useStores()
  const isFocused = useIsFocused()
  const transaction = transactionStore.transactions
  const transactionList = transactionStore.groupTransactionByMonthAndYear()
  const mockBalance = React.useMemo(() => {
    let totalBalance = 0
    transactionStore.transactions.filter((transaction) => {
      if (transaction.type === "IN") {
        totalBalance += transaction.amount
      } else {
        totalBalance -= transaction.amount
      }
    })
    return totalBalance
  }, [transaction])

  const currentWallet = walletStore.wallet
  const navigator = useNavigation()

  onSnapshot(transactionStore.transactions, (snapshot) => {
    transaction.replace(snapshot)
  })

  React.useEffect(() => {
    walletStore.fetchCurrentUserWallet()
    transactionStore.fetchTransactions()
  }, [isFocused])

  const handler = {
    Send: async () => navigator.navigate("Send"),
    Receive: () => navigator.navigate("Receive"),
    Withdraw: () => navigator.navigate("Withdraw"),
    Deposit: () => navigator.navigate("Deposit"),
    OpenTransactionDetail: (transaction: Transaction) =>
      navigator.navigate("TransactionDetail", {
        transaction,
      }),
  }

  const RenderTopContainer = observer(() => (
    <View style={Style.TopContainer}>
      <View style={Style.TopContainerStart}>
        <Text tx="wallet.balance" style={Style.TopContainerText} />
        <Text style={Style.TopContainerText}>{currentWallet.defaultCurrency}</Text>
      </View>
      <View style={Style.TopContainerCenter}>
        <Text style={Style.BalanceText}>
          {formatByUnit(currentWallet.balance + mockBalance, currentWallet.defaultCurrency)}
        </Text>
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
  ))

  const RenderTransactionsContainer = observer(() => (
    <View style={Style.BottomContainer}>
      <Text tx="common.transaction" style={Style.BottomHeader} />
      <Text style={{ marginBottom: 20 }}>
        <Text style={Style.BottomSubheader} tx="wallet.total-transactions" />
        <Text style={Style.BottomSubheader}>: {transaction.length}</Text>
      </Text>
      <SectionList
        sections={transactionList}
        renderSectionHeader={({ section: { month, year } }) => (
          <View style={Style.BottomTransactionLabelContainer}>
            <Text style={Style.BottomTransactionLabelText}>{month}</Text>
            <Text style={Style.BottomTransactionLabelText}>{year}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPressHandler={() => handler.OpenTransactionDetail(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  ))

  return (
    <View testID="WalletScreen" style={Style.Container}>
      <Screen preset="fixed">
        <RenderTopContainer />
        <RenderTransactionsContainer />
      </Screen>
    </View>
  )
})
