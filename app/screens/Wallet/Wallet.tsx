import React from "react"
import { GestureResponderEvent, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./Wallet.style"
import { useStores } from "../../models"
import { onSnapshot } from "mobx-state-tree"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { TransactionItem } from "../Transaction/TransactionItem"
import { color } from "../../theme"
import { TxKeyPath } from "../../i18n"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { formatByUnit } from "../../utils/currency"
import { SectionList } from "react-native"
import { Transaction } from "../../models/transaction/transaction"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { RequestedTransaction } from "../../models/requested-transaction/requested-transaction"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"
import { load, save } from "../../utils/storage"

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
  const [loading, setLoading] = React.useState(false)
  const { walletStore, bankStore, userStore } = useStores()
  const isFocused = useIsFocused()
  const transaction = walletStore.transactions
  const transactionList = walletStore.groupTransactionByMonthAndYear(transaction)

  const currentWallet = walletStore.wallet
  const navigator = useNavigation()

  onSnapshot(walletStore.transactions, (snapshot) => {
    snapshot.concat(walletStore.requestedTransactions)
  })

  React.useEffect(() => {
    const fetchData = async () => {
      const keys = [
        STORAGE_KEY.BANK_ACCOUNTS,
        STORAGE_KEY.MY_WALLET,
        STORAGE_KEY.TRANSACTIONS,
        STORAGE_KEY.CONTACTS,
      ]
      const caches = await Promise.all(keys.map((key) => load(key)))
      if (caches.includes((cache) => cache === false)) {
        setLoading(true)
        const response = await Promise.all([
          bankStore.fetchMyBankAccounts(),
          walletStore.fetchCurrentUserWallet(),
          walletStore.fetchTransactions(),
          userStore.fetchUserContacts(),
        ])

        if (response.some((res) => res.success !== false)) {
          keys.forEach((key, index) => save(key, response[index].data))
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {}
  }, [isFocused])

  const handler = {
    Send: async () => navigator.navigate("Send"),
    Receive: () => navigator.navigate("Receive"),
    Withdraw: () =>
      navigator.navigate("BankTransferAmountCreation", {
        action: "WITHDRAW",
      }),
    Deposit: () =>
      navigator.navigate("BankTransferAmountCreation", {
        action: "DEPOSIT",
      }),
    OpenTransactionDetail: (transaction: Transaction) =>
      navigator.navigate("TransactionDetail", {
        transaction,
      }),
    OpenRequestedTransactionDetail: (transaction: RequestedTransaction) =>
      navigator.navigate("RequestedTransactionDetail", {
        transaction,
      }),
    GoToPaymentMethod: () => navigator.navigate("PaymentMethod"),
  }

  const RenderTopContainer = React.memo(() => (
    <View style={Style.TopContainer}>
      <View style={Style.TopContainerStart}>
        <Text tx="wallet.balance" style={Style.TopContainerText} />
        <Text style={Style.TopContainerText}>{currentWallet.defaultCurrency}</Text>
      </View>
      <View style={Style.TopContainerCenter}>
        <Text style={Style.BalanceText}>
          {formatByUnit(currentWallet.balance, currentWallet.defaultCurrency)}
        </Text>
        <Text style={Style.BalanceRate}>
          {walletStore.percentageChange === 0 ? "+0.00" : walletStore.percentageChange.toString()}%
        </Text>
      </View>
      <RenderPaymentMethodContainer />
      <View style={Style.TopContainerEnd}>
        <CustomButton onPressHandler={handler.Send} tx="common.send">
          <MaterialCommunityIcons name="cash-plus" color={color.palette.offWhite} size={27} />
        </CustomButton>
        <CustomButton onPressHandler={handler.Receive} tx="common.receive">
          <MaterialCommunityIcons name="cash-minus" color={color.palette.offWhite} size={27} />
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

  const RenderTransactionEmptyContainer = React.memo(() => (
    <View style={Style.EmptyContainer}>
      <Text style={Style.EmptyContainerHeader}>???_???</Text>
      <Text style={Style.EmptyContainerSubHeader} tx="common.empty.transaction" />
    </View>
  ))

  const RenderTransactionsContainer = React.memo(() => (
    <View style={Style.BottomContainer}>
      <Text tx="common.transaction" style={Style.BottomHeader} />
      <Text style={{ marginBottom: transactionList.length !== 0 ? 20 : 0 }}>
        <Text style={Style.BottomSubheader} tx="wallet.total-transactions" />
        <Text style={Style.BottomSubheader}>: {transaction.length}</Text>
      </Text>
      {transactionList.length === 0 ? (
        <RenderTransactionEmptyContainer />
      ) : (
        <SectionList
          scrollEnabled={false}
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
              onPressHandler={() =>
                item.type
                  ? handler.OpenRequestedTransactionDetail(item)
                  : handler.OpenTransactionDetail(item)
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  ))

  const RenderPaymentMethodContainer = React.memo(() => (
    <Button style={Style.PaymentMethodContainer} onPress={handler.GoToPaymentMethod}>
      <View>
        <Text style={Style.PaymentMethodHeader} tx="common.paymentMethod" />
        <Text style={Style.PaymentMethodSubHeader}>
          {bankStore.bankAccounts.length === 0
            ? "No payment method connected"
            : `${bankStore.bankAccounts.length} bank accounts`}
        </Text>
      </View>
      <View>
        <MaterialIcons name="keyboard-arrow-right" color={color.palette.offGray} size={25} />
      </View>
    </Button>
  ))

  return (
    <View testID="WalletScreen" style={Style.Container}>
      <Screen unsafe={true} preset={loading ? "fixed" : "scroll"}>
        {loading ? (
          <NeutronpaySpinner style={{ marginTop: -115 }} />
        ) : (
          <>
            <RenderTopContainer />
            <RenderTransactionsContainer />
          </>
        )}
      </Screen>
    </View>
  )
})
