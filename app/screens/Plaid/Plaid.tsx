import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import PlaidLink from "@burstware/expo-plaid-link"
import Style from "./Plaid.style"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"
import I18n from "i18n-js"

export const PlaidScreen = observer(function PlaidScreen() {
  const { bankStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()

  React.useEffect(() => {
    bankStore.fetchLinkToken()
  }, [isFocused])

  return (
    <View testID="PlaidScreen" style={Style.Container}>
      <Screen unsafe={true}>
        <PlaidLink
          linkToken={bankStore.linkToken}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => {
            console.log(exit)
            alert(__DEV__ ? exit.error.errorMessage : I18n.t("somethingWrong"))
            navigator.navigate("PaymentMethod")
          }}
          onSuccess={async ({ publicToken, metadata }) =>
            bankStore.connectBankAccount({ publicToken, metadata }).then((res) => {
              if (res.success) {
                bankStore.fetchMyBankAccounts()
                navigator.navigate("PaymentMethod")
              }
            })
          }
        />
      </Screen>
    </View>
  )
})
