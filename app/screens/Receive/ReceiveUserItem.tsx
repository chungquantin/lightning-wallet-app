import React from "react"
import { observer } from "mobx-react-lite"
import { List } from "react-native-paper"
import { color } from "../../theme"
import { Style } from "./ReceiveUserItem.style"

export const ReceiveUserItem = observer(function ReceiveUserItem() {
  return (
    <List.Item
      background={color.transparent}
      titleStyle={Style.ItemTitle}
      descriptionStyle={Style.ItemDescription}
      title="First Item"
      description="Hello World"
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  )
})
