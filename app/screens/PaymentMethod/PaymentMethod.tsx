import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Button } from "../../components"
import Style from "./PaymentMethod.style"
import { color } from "../../theme"
import { Avatar } from "react-native-paper"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"

export const PaymentMethodScreen = observer(function PaymentMethodScreen() {
  const { bankStore } = useStores()
  const navigator = useNavigation()
  const isFocused = useIsFocused()

  const handler = {
    SwitchPaymentMethod: () => navigator.navigate("Plaid"),
  }

  React.useEffect(() => {
    bankStore.fetchMyBankAccounts()
  }, [isFocused])

  const RenderBankAccountItem = ({ name, type, accountNumber, routingNumber }) => (
    <View style={Style.BankAccountContainer}>
      <View style={Style.BankAccountTopContainer}>
        <View style={Style.BankAccountImage}>
          <Avatar.Image
            source={{
              uri: "https://logodownload.org/wp-content/uploads/2018/05/western-union-logo-3-1.png",
            }}
            size={50}
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }}>{type}</Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      />
      <View style={Style.BankAccountBottomContainer}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold" }} tx="common.account" />
          <Text style={{ fontSize: 13, marginTop: 3 }}>{accountNumber}</Text>
        </View>
        <View style={{ backgroundColor: color.palette.offGray, height: "100%", width: 0.5 }} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold" }} tx="common.routing" />
          <Text style={{ fontSize: 13, marginTop: 3 }}>{routingNumber}</Text>
        </View>
      </View>
    </View>
  )
  return (
    <View testID="PaymentMethodScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text style={Style.Header} tx="common.bankAccounts" />
        {bankStore.bankAccounts.map((bankAccount) => (
          <RenderBankAccountItem
            key={bankAccount.id}
            accountNumber={bankAccount.accountNumber}
            name={bankAccount.institutionName}
            routingNumber={bankAccount.routingNumber}
            type={bankAccount.name}
          />
        ))}
        <Button style={Style.Button} onPress={handler.SwitchPaymentMethod}>
          <Text
            style={{
              color: color.palette.offGray,
            }}
            tx="common.addNewBankAccount"
          />
        </Button>
      </Screen>
    </View>
  )
})
