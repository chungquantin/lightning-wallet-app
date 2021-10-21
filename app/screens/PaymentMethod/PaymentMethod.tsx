import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Button } from "../../components"
import Style from "./PaymentMethod.style"
import { color } from "../../theme"
import { useStores } from "../../models"
import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/core"
import { Avatar } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ParamListBase } from "@react-navigation/routers"
import { BankAccount } from "../../models/bank-account/bank-account"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { load, save } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

interface PaymentMethodRouteProps extends ParamListBase {
  RoutingDetail: {
    action: "DEPOSIT" | "WITHDRAW" | "PASSIVE"
  }
}

export const PaymentMethodScreen = observer(function PaymentMethodScreen() {
  const [loading, setLoading] = React.useState(false)
  const { bankStore, userStore } = useStores()
  const navigator = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute<RouteProp<PaymentMethodRouteProps, "RoutingDetail">>()

  const handler = {
    AddNewBankAccount: () => navigator.navigate("Plaid"),
    OpenBankAccountDetail: (bankAccount: BankAccount) => {
      switch (route.params?.action || "") {
        case "DEPOSIT":
        case "WITHDRAW":
          navigator.navigate("BankTransferAmountCreation", {
            bankAccount,
          })
          break
        default:
          navigator.navigate("BankAccountDetail", {
            bankAccount,
          })
          break
      }
    },
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const bankAccountsCache = await load(STORAGE_KEY.BANK_ACCOUNTS)
      if (!bankAccountsCache) {
        setLoading(true)
        const fetchMyBankAccountsResponse = await bankStore.fetchMyBankAccounts()
        if (fetchMyBankAccountsResponse.success) {
          save(STORAGE_KEY.BANK_ACCOUNTS, fetchMyBankAccountsResponse.data)
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {}
  }, [isFocused])

  const RenderBankAccountItem = ({ name, type, logo, primaryColor, onPressHandler }) => (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={Style.BankAccountContainer}>
        <View style={Style.BankAccountTopContainer}>
          <View style={Style.BankAccountImage}>
            {logo ? (
              <Avatar.Image
                source={{
                  uri: logo,
                }}
                size={35}
              />
            ) : (
              <Avatar.Text
                label={name.charAt(0).toString()}
                style={{
                  backgroundColor: primaryColor || color.primary,
                }}
                size={35}
              />
            )}
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontSize: 13, marginTop: 3 }}>{type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const RenderBankAccountContainer = React.memo(() => (
    <>
      <Text style={Style.Header} tx="common.bankAccounts" />
      {bankStore.bankAccounts.map((bankAccount) => (
        <RenderBankAccountItem
          onPressHandler={() => handler.OpenBankAccountDetail(bankAccount)}
          key={bankAccount.id}
          logo={bankAccount.institutionLogo}
          primaryColor={bankAccount.institutionPrimaryColor}
          name={bankAccount.institutionName}
          type={bankAccount.name}
        />
      ))}
      <Button style={Style.Button} onPress={handler.AddNewBankAccount}>
        <Text
          style={{
            color: color.palette.offGray,
          }}
          tx="common.addNewBankAccount"
        />
      </Button>
    </>
  ))
  return (
    <View testID="PaymentMethodScreen" style={Style.Container}>
      <Screen preset="fixed">
        {loading ? <NeutronpaySpinner /> : <RenderBankAccountContainer />}
      </Screen>
    </View>
  )
})
