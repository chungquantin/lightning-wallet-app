import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./BankAccountDetail.style"
import { ParamListBase } from "@react-navigation/routers"
import { BankAccount } from "../../models/bank-account/bank-account"
import { RouteProp, useRoute } from "@react-navigation/core"
import { Avatar } from "react-native-paper"
import { color } from "../../theme"
import moment from "moment"

interface BankAccountRouteProps extends ParamListBase {
  BankAccountDetail: {
    bankAccount: BankAccount
  }
}

export const BankAccountDetailScreen = observer(function BankAccountDetailScreen() {
  const route = useRoute<RouteProp<BankAccountRouteProps, "BankAccountDetail">>()
  const { bankAccount } = route.params
  return (
    <View testID="BankAccountDetailScreen" style={Style.Container}>
      <Screen preset="fixed">
        <View style={{ ...Style.ItemRow, justifyContent: "center", alignItems: "center" }}>
          {bankAccount.institutionLogo ? (
            <Avatar.Image
              source={{
                uri: bankAccount.institutionLogo,
              }}
              size={80}
            />
          ) : (
            <Avatar.Text
              label={bankAccount.institutionName.charAt(0).toString()}
              style={{
                backgroundColor: bankAccount.institutionPrimaryColor || color.primary,
              }}
              size={80}
            />
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.bank" />
            <Text style={Style.ItemRowRightText}>{bankAccount.institutionName}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.name" />
            <Text style={Style.ItemRowRightText}>{bankAccount.name}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.officialName" />
            <Text style={{ ...Style.ItemRowRightText, width: 150, textAlign: "right" }}>
              {bankAccount.officialName}
            </Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.availableBalance" />
            <Text style={Style.ItemRowRightText}>{bankAccount.availableBalance}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.currentBalance" />
            <Text style={Style.ItemRowRightText}>{bankAccount.currentBalance}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.limitBalance" />
            <Text style={Style.ItemRowRightText}>{bankAccount.limitBalance || "N/A"}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.routingNumber" />
            <Text style={Style.ItemRowRightText}>{bankAccount.routingNumber}</Text>
          </View>
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.accountNumber" />
            <Text style={Style.ItemRowRightText}>{bankAccount.accountNumber}</Text>
          </View>
          {bankAccount.institutionWebsite && (
            <View style={Style.ItemRow}>
              <Text style={Style.ItemRowLeftText} tx="bankAccount.website" />
              <Text style={Style.ItemRowRightText}>{bankAccount.institutionWebsite}</Text>
            </View>
          )}
          <View style={Style.ItemRow}>
            <Text style={Style.ItemRowLeftText} tx="bankAccount.addedAt" />
            <Text style={Style.ItemRowRightText}>
              {moment.unix(parseInt(bankAccount.addedAt)).format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
      </Screen>
    </View>
  )
})
