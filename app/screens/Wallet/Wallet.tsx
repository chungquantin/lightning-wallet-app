import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Wallet.style"

export const WalletScreen = observer(function WalletScreen() {
  return (
    <View testID="WalletScreen" style={Style.Container}>
      <Screen preset="fixed">
        <View style={Style.BottomContainer}>
          <Text tx="common.transaction" style={Style.BottomHeader} />
          <Text>
            <Text style={Style.BottomSubheader} tx="wallet.total-transactions" />
            <Text style={Style.BottomSubheader}>: 89</Text>
          </Text>
        </View>
      </Screen>
    </View>
  )
})
