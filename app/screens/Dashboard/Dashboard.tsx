import React from "react"
import { View, ViewStyle} from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import { color } from "../../theme"

const FULL: ViewStyle = { flex: 1, backgroundColor: color.background }

export const DashboardScreen = observer(function DashboardScreen() {
  return (
    <View testID="DashboardScreen" style={FULL}>
					<Screen>
						<Text tx="common.send"/>
					</Screen>
    </View>
  )
})
