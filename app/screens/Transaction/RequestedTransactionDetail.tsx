import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./RequestedTransactionDetail.style"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useRoute } from "@react-navigation/core"
import { formatByUnit } from "../../utils/currency"
import { ActivityIndicator } from "react-native-paper"
import { color } from "../../theme"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"
import getSymbolFromCurrency from "currency-symbol-map"
import { RequestedTransaction } from "../../models/requested-transaction/requested-transaction"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import * as moment from "moment"
import { stringUtil } from "../../utils"
import { WalletResolverApi } from "../../services/resolvers"
import { remove } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

interface RequestedTransactionDetailRouteProps extends ParamListBase {
  RequestedTransactionDetail: {
    transaction: RequestedTransaction
  }
}

export const RequestedTransactionDetailScreen = observer(
  function RequestedTransactionDetailScreen() {
    const route =
      useRoute<RouteProp<RequestedTransactionDetailRouteProps, "RequestedTransactionDetail">>()
    const { walletStore, userStore, transactionDetailStore } = useStores()
    const { transaction } = route.params
    const [loading, setLoading] = React.useState(false)
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const navigator = useNavigation()

    React.useEffect(() => {
      const fetchTransactionDetail = async () => {
        setLoading(true)
        const success = await transactionDetailStore.fetchTransactionDetail(transaction)
        if (success) {
          setLoading(false)
        }
      }
      // fetchTransactionDetail()
      return () => {
        transactionDetailStore.clear()
      }
    }, [])

    const RenderUpperContainer = React.memo(() => (
      <View style={Style.UpperContainer}>
        {/* <View style={Style.ImageContainer}>
          {transactionDetailStore.sender.avatar ? (
            <Avatar.Image
              style={{
                marginRight: 10,
              }}
              source={{
                uri: transactionDetailStore.sender.avatar,
              }}
              size={60}
            />
          ) : (
            <Avatar.Text
              label={userStore.currentUser.firstName.charAt(0)}
              style={{
                marginRight: 10,
                backgroundColor: color.primary,
              }}
              size={60}
            />
          )}
          {transactionDetailStore.receiver.avatar ? (
            <Avatar.Image
              style={{
                marginRight: 10,
              }}
              source={{
                uri: transactionDetailStore.receiver.avatar,
              }}
              size={60}
            />
          ) : (
            <Avatar.Text
              label={userStore.currentUser.firstName.charAt(0)}
              style={{
                marginRight: 10,
                backgroundColor: color.primary,
              }}
              size={60}
            />
          )}
        </View> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={Style.CurrencySymbol}>{getSymbolFromCurrency(transaction.currency)}</Text>
          <Text style={Style.Amount}>
            {formatByUnit(transaction.amount, transaction.currency, false, false)}
          </Text>
        </View>
      </View>
    ))

    const RenderInvoiceDetailContainer = React.memo(() => (
      <View
        style={{
          backgroundColor: color.secondaryBackground,
          borderRadius: 20,
          paddingVertical: 20,
          marginHorizontal: 25,
        }}
      >
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.description" />
          <Text style={{ width: 150, textAlign: "right" }}>{transaction.description}</Text>
        </View>
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.amount" />
          <Text>{formatByUnit(transaction.amount, transaction.currency)}</Text>
        </View>
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.createdDate" />
          <Text>{moment.unix(parseInt(transaction.createdAt)).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.expiredDate" />
          <Text>{moment.unix(parseInt(transaction.expiredAt)).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.settledDate" />
          <Text>{moment.unix(parseInt(transaction.settledAt)).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="transactionRequest.status" />
          <Text>{stringUtil.capitalize(transaction.status)}</Text>
        </View>
        {buttonLoading ? (
          <ActivityIndicator color={color.primary} size={20} />
        ) : transaction.type === "SEND" ? (
          transaction.status === "PENDING" && <RenderButtonContainer />
        ) : (
          transaction.status === "PENDING" && (
            <View style={Style.ButtonContainer}>
              <Button
                style={{ ...Style.CancelButton, backgroundColor: color.error }}
                onPress={handler.Cancel}
              >
                <Text>Cancel</Text>
              </Button>
            </View>
          )
        )}
      </View>
    ))

    const RenderButtonContainer = React.memo(() => (
      <View style={Style.ButtonContainer}>
        <Button style={Style.CancelButton} onPress={handler.Reject}>
          <Text tx="transactionRequest.reject" />
        </Button>
        <View style={{ width: 10 }} />
        <Button style={Style.SubmitButton} onPress={handler.Accept}>
          <Text tx="transactionRequest.accept" />
        </Button>
      </View>
    ))

    const handler = {
      Accept: async () => {
        setButtonLoading(true)
        const response = await new WalletResolverApi().respondPaymentRequest(
          true,
          transaction.requestId,
        )
        if (response.success) {
          setButtonLoading(false)
          navigator.navigate("TransactionComplete", {
            user: transactionDetailStore.sender,
            amount: transaction.amount,
            currency: transaction.currency,
            description: transaction.description,
            action: "SEND",
          })
        }
        remove(STORAGE_KEY.REQUESTED_TRANSACTIONS)
        remove(STORAGE_KEY.TRANSACTIONS)
        remove(STORAGE_KEY.MY_WALLET)
      },
      Reject: async () => {
        setButtonLoading(true)
        const response = await new WalletResolverApi().respondPaymentRequest(
          false,
          transaction.requestId,
        )
        if (response.success) {
          setButtonLoading(false)
          navigator.goBack()
        }
        remove(STORAGE_KEY.REQUESTED_TRANSACTIONS)
        remove(STORAGE_KEY.MY_WALLET)
      },
      Cancel: async () => {
        setButtonLoading(true)
        const response = await new WalletResolverApi().cancelPaymentRequest(transaction.requestId)
        if (response.success) {
          setButtonLoading(false)
          navigator.goBack()
        }
        remove(STORAGE_KEY.REQUESTED_TRANSACTIONS)
        remove(STORAGE_KEY.MY_WALLET)
      },
    }
    return (
      <View testID="RequestedTransactionDetailScreen" style={Style.Container}>
        {loading ? (
          <NeutronpaySpinner />
        ) : (
          <Screen preset="scroll">
            <RenderUpperContainer />
            <RenderInvoiceDetailContainer />
          </Screen>
        )}
      </View>
    )
  },
)
