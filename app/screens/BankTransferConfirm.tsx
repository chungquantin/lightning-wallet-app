import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import Style from "./BankTransferConfirm.style"
import { BankAccount } from "../models/bank-account/bank-account"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useRoute } from "@react-navigation/core"
import { FiatCurrency } from "../generated/graphql"
import { formatByUnit } from "../utils/currency"
import { Avatar, Divider } from "react-native-paper"
import { color } from "../theme"
import { stringUtil } from "../utils"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "../models"
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
  return (
    <View testID="BankTransferConfirmScreen" style={Style.Container}>
      <Screen preset="scroll">
        <View style={{ marginBottom: 40, justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 30 }}>
            {bankAccount.institutionLogo ? (
              <Avatar.Image
                style={{
                  marginRight: 10,
                }}
                source={{
                  uri: bankAccount.institutionLogo,
                }}
                size={70}
              />
            ) : (
              <Avatar.Text
                label={bankAccount.institutionName.charAt(0)}
                style={{
                  marginRight: 10,
                  backgroundColor: bankAccount.institutionPrimaryColor || color.primary,
                }}
                size={70}
              />
            )}
            <MaterialCommunityIcons
              name="bank-transfer-out"
              color={color.palette.offWhite}
              size={65}
            />
          </View>
          <Text style={{ color: color.palette.offGray, marginBottom: 10 }}>Deposit</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 30,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              {getSymbolFromCurrency(currency)}
            </Text>
            <Text
              style={{
                fontSize: 45,
                fontWeight: "bold",
              }}
            >
              {fee + amount}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.secondaryBackground,
            borderRadius: 20,
            paddingVertical: 20,
            marginHorizontal: 25,
          }}
        >
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Payment method</Text>
            <Text>Bank account</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Account type</Text>
            <Text>{bankAccount.name}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Description</Text>
            <Text style={{ width: 100, textAlign: "right" }}>
              {stringUtil.capitalize(action)} from {bankAccount.institutionName}
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
            <Divider
              style={{
                marginVertical: 10,
                backgroundColor: color.palette.offGray,
                width: "100%",
                height: 1,
              }}
            />
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Remaining</Text>
            <Text>{formatByUnit(bankAccount.availableBalance - amount - fee, currency)}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Amount</Text>
            <Text>{formatByUnit(amount, currency)}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>1% Fee</Text>
            <Text>{formatByUnit(fee, currency)}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
            <Divider
              style={{
                marginVertical: 10,
                backgroundColor: color.palette.offGray,
                width: "100%",
                height: 1,
              }}
            />
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemLeftText}>Balance</Text>
            <Text style={{ fontWeight: "bold", color: color.palette.green }}>
              {formatByUnit(walletStore.wallet.balance + fee + amount, currency)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
              marginHorizontal: 15,
            }}
          >
            <Button
              style={{ width: "100%", flex: 1, backgroundColor: color.primaryDarker, height: 40 }}
            >
              <Text>Cancel</Text>
            </Button>
            <View style={{ width: 10 }} />
            <Button style={{ width: "100%", flex: 1, backgroundColor: color.primary, height: 40 }}>
              <Text>Confirm</Text>
            </Button>
          </View>
        </View>
      </Screen>
    </View>
  )
})
