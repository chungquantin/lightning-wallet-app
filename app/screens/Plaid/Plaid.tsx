import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import PlaidLink from "@burstware/expo-plaid-link"
import Style from "./Plaid.style"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"
import I18n from "i18n-js"
import { color } from "../../theme"
import { ActivityIndicator } from "react-native-paper"
import { remove } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

export const PlaidScreen = observer(function PlaidScreen() {
  const [loading, setLoading] = React.useState(false)
  const { bankStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()

  React.useEffect(() => {
    setLoading(true)
    bankStore.fetchLinkToken().then(() => {
      setLoading(false)
    })
  }, [isFocused])

  return (
    <View testID="PlaidScreen" style={Style.Container}>
      <Screen unsafe={true} style={{ backgroundColor: color.palette.white }}>
        {bankStore.linkToken && !loading ? (
          <PlaidLink
            linkToken={bankStore.linkToken}
            onEvent={(event) => console.log(event)}
            onExit={(exit) => {
              alert(__DEV__ ? exit.error.errorMessage : I18n.t("somethingWrong"))
              //navigator.navigate("PaymentMethod")
            }}
            onSuccess={async ({ publicToken, metadata }) => {
              bankStore.connectBankAccount({ publicToken, metadata }).then((res) => {
                if (res.success) {
                  bankStore.fetchMyBankAccounts()
                  navigator.navigate("PaymentMethod")
                }
              })
              remove(STORAGE_KEY.BANK_ACCOUNTS)
            }}
          />
        ) : (
          <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator style={{ marginBottom: 20 }} size={35} color={color.primary} />
            <Text style={{ color: color.background }}>Connecting to Plaid...</Text>
          </View>
        )}
      </Screen>
    </View>
  )
})
