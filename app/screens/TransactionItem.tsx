import React from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../theme"
import { Text } from "../components"

interface Props {
	transaction: {
		
	}
}

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.primary,
  },
})

export const TransactionItem = observer(function TransactionItem(props : Props) {
  return (
    <View testID="TransactionItem" style={Style.Container}>
      <Text>Profile</Text>
    </View>
  )
})
