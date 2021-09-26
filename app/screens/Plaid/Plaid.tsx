import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import PlaidLink from "@burstware/expo-plaid-link"
import Style from "./Plaid.style"
import { useStores } from "../../models"
import { useIsFocused } from "@react-navigation/core"
import { BankResolverApi } from "../../services/resolvers"

export const PlaidScreen = observer(function PlaidScreen() {
  const { bankStore } = useStores()
  const isFocused = useIsFocused()

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
            alert(exit.error)
          }}
          onSuccess={async ({ publicToken, metadata }) => {
            console.log(publicToken, metadata)
            // public-sandbox-3fbddaba-3daf-44f9-942d-50e805c18d28
            try {
              if (publicToken) {
                const response = await new BankResolverApi().plaidExchangePublicToken(publicToken)
                if (response.success) {
                  console.log(response.data)
                }
              }
            } catch (error) {
              alert(error.message)
            }
          }}
        />
      </Screen>
    </View>
  )
})
