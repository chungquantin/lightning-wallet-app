import React from "react"
import { View} from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Wallet.style"

export const WalletScreen = observer(function WalletScreen() {
  return (
    <View testID="WalletScreen" style={Style.Container}>
					<Screen>
						<Text tx="common.send"/>
					</Screen>
    </View>
  )
})


