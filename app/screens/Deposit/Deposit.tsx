import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import PlaidLink from "@burstware/expo-plaid-link"
import Style from "./Deposit.style"
import { useStores } from "../../models"
import { useIsFocused } from "@react-navigation/core"

export const DepositScreen = observer(function DepositScreen() {
  const { bankStore } = useStores()
  const isFocused = useIsFocused()

  React.useEffect(() => {
    bankStore.fetchLinkToken()
  }, [isFocused])

  return (
    <View testID="DepositScreen" style={Style.Container}>
      <Screen unsafe={true}>
        <PlaidLink
          linkToken={bankStore.linkToken}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => console.log(exit)}
          onSuccess={(success) => console.log(success.publicToken)}
        />
      </Screen>
    </View>
  )
})
