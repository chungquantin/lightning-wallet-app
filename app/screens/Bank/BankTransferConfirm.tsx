import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./BankTransferConfirm.style"
import { BankAccount } from "../../models/bank-account/bank-account"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useRoute } from "@react-navigation/core"
import { FiatCurrency } from "../../generated/graphql"
import { formatByUnit } from "../../utils/currency"
import { Avatar, Divider } from "react-native-paper"
import { color } from "../../theme"
import { stringUtil } from "../../utils"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"
import getSymbolFromCurrency from "currency-symbol-map"

interface BankTransferConfirmRouteProps extends ParamListBase {
  InvoiceDetail: {
    action: "DEPOSIT" | "WITHDRAW"
    bankAccount: BankAccount
    amount: number
    currency: FiatCurrency
    fee: number
  }
}

export const BankTransferConfirmScreen = observer(function BankTransferConfirmScreen() {
  const { walletStore } = useStores()
  const route = useRoute<RouteProp<BankTransferConfirmRouteProps, "InvoiceDetail">>()
  const { action, amount, currency, bankAccount, fee } = route.params
  const navigator = useNavigation()

  const RenderUpperContainer = React.memo(() => (
    <View style={Style.UpperContainer}>
      <View style={Style.ImageContainer}>
        {bankAccount.institutionLogo ? (
          <Avatar.Image
            style={{
              marginRight: 10,
            }}
            source={{
              uri: bankAccount.institutionLogo,
            }}
            size={60}
          />
        ) : (
          <Avatar.Text
            label={bankAccount.institutionName.charAt(0)}
            style={{
              marginRight: 10,
              backgroundColor: bankAccount.institutionPrimaryColor || color.primary,
            }}
            size={60}
          />
        )}
        <MaterialCommunityIcons name="bank-transfer-out" color={color.palette.offWhite} size={65} />
      </View>
      {action === "DEPOSIT" ? (
        <Text style={Style.SubHeaderText}>{stringUtil.capitalize(action)} + 1% fee</Text>
      ) : (
        <Text style={Style.SubHeaderText}>{stringUtil.capitalize(action)}</Text>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={Style.CurrencySymbol}>{getSymbolFromCurrency(currency)}</Text>
        <Text style={Style.Amount}>
          {formatByUnit(action === "DEPOSIT" ? amount + fee : amount, currency, false, false)}
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
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.paymentMethod" />
        <Text tx="bankTransferDetail.bankAccount" />
      </View>
      <View style={Style.ItemRow}>
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.accountType" />
        <Text>{bankAccount.name}</Text>
      </View>
      <View style={Style.ItemRow}>
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.description" />
        <Text style={{ width: 100, textAlign: "right" }}>
          {stringUtil.capitalize(action)} from {bankAccount.institutionName}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
        <Divider style={Style.Separator} />
      </View>
      <View style={Style.ItemRow}>
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.remaining" />
        <Text>
          {formatByUnit(
            action === "DEPOSIT"
              ? bankAccount.availableBalance - amount - fee
              : bankAccount.availableBalance + amount,
            currency,
          )}
        </Text>
      </View>
      <View style={Style.ItemRow}>
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.amount" />
        <Text>{formatByUnit(amount, currency)}</Text>
      </View>
      {action === "DEPOSIT" && (
        <View style={Style.ItemRow}>
          <Text style={Style.ItemLeftText} tx="bankTransferDetail.fee" />
          <Text>{formatByUnit(fee, currency)}</Text>
        </View>
      )}

      <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
        <Divider style={Style.Separator} />
      </View>
      <View style={Style.ItemRow}>
        <Text style={Style.ItemLeftText} tx="bankTransferDetail.balance" />
        <Text style={Style.BalanceText}>
          {formatByUnit(
            action === "DEPOSIT"
              ? walletStore.wallet.balance + amount
              : walletStore.wallet.balance - amount,
            currency,
          )}
        </Text>
      </View>
      <RenderButtonContainer />
    </View>
  ))

  const RenderButtonContainer = React.memo(() => (
    <View style={Style.ButtonContainer}>
      <Button style={Style.CancelButton} onPress={handler.Cancel}>
        <Text tx="common.cancel" />
      </Button>
      <View style={{ width: 10 }} />
      <Button style={Style.SubmitButton} onPress={handler.Confirm}>
        <Text tx="common.confirm" />
      </Button>
    </View>
  ))

  const handler = {
    Confirm: () => navigator.navigate("BankTransferComplete", route.params),
    Cancel: () => navigator.goBack(),
  }
  return (
    <View testID="BankTransferConfirmScreen" style={Style.Container}>
      <Screen preset="scroll">
        <RenderUpperContainer />
        <RenderInvoiceDetailContainer />
      </Screen>
    </View>
  )
})
