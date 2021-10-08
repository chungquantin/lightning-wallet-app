import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../components"
import Style from "./BankTransferAmountCreation.style"
import { Calculator } from "./Calculator"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useRoute } from "@react-navigation/core"
import getSymbolFromCurrency from "currency-symbol-map"
import { formatByUnit } from "../utils/currency"
import useFormValidation from "../hooks/useFormValidation"
import { useStores } from "../models"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/core"
import { color } from "../theme"
import { Avatar } from "react-native-paper"
import I18n from "i18n-js"
import { BUSINESS_CONSTANT } from "../constants/BusinessConstant"
import { BankAccount } from "../models/bank-account/bank-account"

interface BankTransferAmountCreationRouteProps extends ParamListBase {
  InvoiceDetail: {
    action: "DEPOSIT" | "WITHDRAW"
    bankAccount: BankAccount
  }
}

export const BankTransferAmountCreationScreen = observer(
  function BankTransferAmountCreationScreen() {
    const { walletStore } = useStores()
    const { formValues, handleSetFieldValue } = useFormValidation<{
      amount: number
      currency: string
    }>({
      amount: 0,
      currency: walletStore.wallet.defaultCurrency,
    })
    const route = useRoute<RouteProp<BankTransferAmountCreationRouteProps, "InvoiceDetail">>()
    let { action, bankAccount } = route.params
    if (!bankAccount) {
      bankAccount = null
    }
    const navigator = useNavigation()

    // TODO Location specification CA & VN [CA - 5$, VN - free]
    const fee = formValues.amount * BUSINESS_CONSTANT.transactionFee
    const disableCondition =
      action === "DEPOSIT"
        ? formValues.amount + fee > (bankAccount ? bankAccount.availableBalance : 0)
          ? color.error
          : color.palette.white
        : formValues.amount > walletStore.wallet.balance
        ? color.error
        : color.palette.white
    const max =
      action === "DEPOSIT"
        ? bankAccount
          ? bankAccount.availableBalance -
            bankAccount.availableBalance * BUSINESS_CONSTANT.transactionFee
          : 0
        : walletStore.wallet.balance

    const handler = {
      ConnectPaymentMethod: () =>
        navigator.navigate("PaymentMethod", {
          action,
        }),
      Next: () => {
        const payload = {
          amount: formValues.amount,
          currency: formValues.currency,
          fee,
          bankAccount,
        }
        switch (action) {
          case "WITHDRAW":
            navigator.navigate("BankTransferConfirm", { ...payload, action: "WITHDRAW" })
            break
          case "DEPOSIT":
            navigator.navigate("BankTransferConfirm", { ...payload, action: "DEPOSIT" })
          default:
            break
        }
      },
    }

    const RenderBankContainer = () => (
      <View style={Style.ConnectPaymentMethodContainer}>
        <TouchableOpacity onPress={handler.ConnectPaymentMethod}>
          <View style={Style.ConnectPaymentMethodButton}>
            <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
              {bankAccount &&
                (bankAccount.institutionLogo ? (
                  <Avatar.Image
                    style={{
                      marginRight: 10,
                    }}
                    source={{
                      uri: bankAccount.institutionLogo,
                    }}
                    size={35}
                  />
                ) : (
                  <Avatar.Text
                    label={bankAccount.institutionName.charAt(0)}
                    style={{
                      marginRight: 10,
                      backgroundColor: bankAccount.institutionPrimaryColor || color.primary,
                    }}
                    size={35}
                  />
                ))}
              <View>
                <Text style={Style.ConnectPaymentMethodHeader}>
                  {bankAccount ? bankAccount.institutionName : I18n.t("common.paymentMethod")}
                </Text>
                <Text style={Style.ConnectPaymentMethodSubHeader}>
                  {bankAccount ? bankAccount.name : "No payment method selected"}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={Style.ConnectPaymentMethodHighlight}>
                {bankAccount ? "Switch" : "Select"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )

    const RenderAmountContainer = () => (
      <View style={Style.UpperContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        ></View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...Style.MaxAmountText, marginTop: 3 }}>Max: </Text>
          <Text style={{ ...Style.MaxAmountText, marginTop: 3 }}>
            {formatByUnit(
              max,
              bankAccount ? bankAccount.currencyCode : walletStore.wallet.defaultCurrency,
            )}
          </Text>
        </View>
        <View style={Style.AmountContainer}>
          <Text
            style={{
              ...Style.CurrencySymbol,
              fontSize:
                formValues.amount < 1000
                  ? Style.CurrencySymbol.fontSize
                  : formValues.amount < 100000
                  ? 35
                  : 25,
              color: disableCondition,
            }}
          >
            {getSymbolFromCurrency(formValues.currency)}
          </Text>
          <Text
            style={{
              ...Style.AmountText,
              fontSize:
                formValues.amount < 1000
                  ? Style.AmountText.fontSize
                  : formValues.amount < 100000
                  ? 50
                  : 40,
              color: disableCondition,
            }}
          >
            {formatByUnit(formValues.amount, formValues.currency, false, false)}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={Style.MaxAmountText}>Balance: </Text>
          <Text style={Style.MaxAmountText}>
            {action === "DEPOSIT"
              ? formatByUnit(
                  bankAccount ? bankAccount.availableBalance : 0,
                  bankAccount ? bankAccount.currencyCode : walletStore.wallet.defaultCurrency,
                )
              : formatByUnit(walletStore.wallet.balance, walletStore.wallet.defaultCurrency)}
          </Text>
        </View>
        {action === "DEPOSIT" && (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...Style.MaxAmountText, marginTop: 3 }}>1% Fee: </Text>
            <Text style={{ ...Style.MaxAmountText, marginTop: 3 }}>
              {formatByUnit(
                fee,
                bankAccount ? bankAccount.currencyCode : walletStore.wallet.defaultCurrency,
              )}
            </Text>
          </View>
        )}
      </View>
    )
    return (
      <View testID="BankTransferAmountCreationScreen" style={Style.Container}>
        <RenderBankContainer />
        <RenderAmountContainer />
        <Calculator
          formValues={formValues}
          onChangeEvent={handleSetFieldValue}
          submitButtonDisabled={formValues.amount <= 0}
          onSubmitEvent={handler.Next}
          maxBalance={action === "DEPOSIT" ? (bankAccount ? max : 0) : walletStore.wallet.balance}
        />
      </View>
    )
  },
)
