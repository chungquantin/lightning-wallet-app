import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Button } from "../../components"
import Style from "./PaymentMethod.style"
import { color } from "../../theme"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"
import { Avatar } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler"

export const PaymentMethodScreen = observer(function PaymentMethodScreen() {
  const { bankStore } = useStores()
  const navigator = useNavigation()
  const isFocused = useIsFocused()

  const handler = {
    SwitchPaymentMethod: () => navigator.navigate("Plaid"),
    OpenBankAccountDetail: () => navigator.navigate("BankAccountDetail"),
  }

  React.useEffect(() => {
    bankStore.fetchMyBankAccounts()
  }, [isFocused])

  const RenderBankAccountItem = ({ name, type, logo, primaryColor }) => (
    <TouchableOpacity onPress={handler.OpenBankAccountDetail}>
      <View style={Style.BankAccountContainer}>
        <View style={Style.BankAccountTopContainer}>
          <View style={Style.BankAccountImage}>
            <Avatar.Image
              source={{
                uri: logo,
              }}
              size={30}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontSize: 13, marginTop: 3 }}>{type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
  return (
    <View testID="PaymentMethodScreen" style={Style.Container}>
      <Screen preset="fixed">
        <Text style={Style.Header} tx="common.bankAccounts" />
        {bankStore.bankAccounts.map((bankAccount) => (
          <RenderBankAccountItem
            key={bankAccount.id}
            logo={bankAccount.institutionLogo}
            primaryColor={bankAccount.institutionPrimaryColor}
            name={bankAccount.institutionName}
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
