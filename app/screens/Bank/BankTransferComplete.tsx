import React from "react"
import { Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./BankTransferComplete.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { formatByUnit } from "../../utils/currency"
import { color } from "../../theme"
import { BankAccount } from "../../models/bank-account/bank-account"
import { FiatCurrency } from "../../generated/graphql"
import { stringUtil } from "../../utils"
import { Avatar } from "react-native-paper"

interface BankTransferCompleteRouteProps extends ParamListBase {
  InvoiceDetail: {
    action: "DEPOSIT" | "WITHDRAW"
    bankAccount: BankAccount
    amount: number
    currency: FiatCurrency
    fee: number
  }
}

export const BankTransferCompleteScreen = observer(function BankTransferCompleteScreen() {
  const route = useRoute<RouteProp<BankTransferCompleteRouteProps, "InvoiceDetail">>()
  const { bankAccount, amount, currency, action, fee } = route.params
  const navigator = useNavigation()

  const RenderTopContainer = React.memo(() => (
    <>
      <View style={Style.DescriptionText}>
        <Text tx="common.method" />
        <Text>: {stringUtil.capitalize(action)}</Text>
      </View>
      <Text
        style={amount < 1000 ? Style.AmountText : { ...Style.AmountText, fontSize: 35 }}
      >{`${formatByUnit(amount, currency, false)} ${currency}`}</Text>
      <View style={Style.DescriptionText}>
        {action === "DEPOSIT" && (
          <>
            <Text tx="bankTransferDetail.fee" />
            <Text style={{ color: color.palette.green }}>
              {` ${formatByUnit(fee, currency, false)} ${currency}`}
            </Text>
          </>
        )}
      </View>
    </>
  ))

  const RenderBankAccountContainer = React.memo(() => (
    <View style={Style.PaymentMethodButton}>
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
          <Text style={Style.PaymentMethodHeader}>{bankAccount.institutionName}</Text>
          <Text style={Style.PaymentMethodSubHeader}>{bankAccount.name}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={Style.PaymentMethodHighlight}>
          {formatByUnit(
            action === "DEPOSIT"
              ? bankAccount.availableBalance - amount - fee
              : bankAccount.availableBalance + amount,
            currency,
          )}
        </Text>
      </View>
    </View>
  ))

  const RenderInnerContainer = React.memo(() => (
    <View style={Style.InnerContainer}>
      <RenderTopContainer />
      <Text
        style={{
          fontSize: Dimensions.get("screen").width / 3,
          marginTop: 50,
          marginBottom: 100,
        }}
      >
        💸
      </Text>
      <View style={{ width: Dimensions.get("screen").width, paddingHorizontal: 35 }}>
        <RenderBankAccountContainer />
        <Button onPress={handler.Done} style={{ height: 50, backgroundColor: color.primary }}>
          <Text tx="common.done" />
        </Button>
      </View>
    </View>
  ))

  const handler = {
    Done: () => navigator.navigate("Wallet"),
  }

  return (
    <View testID="BankTransferCompleteScreen" style={Style.Container}>
      <Screen unsafe={true} style={Style.Container}>
        <RenderInnerContainer />
      </Screen>
    </View>
  )
})
