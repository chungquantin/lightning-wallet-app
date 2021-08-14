import React from "react"
import { observer } from "mobx-react-lite"
import { Avatar, List } from "react-native-paper"
import { color } from "../../theme"
import { Style } from "./ReceiveUserItem.style"
import { User } from "../../models/user/user"
import { GestureResponderEvent, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Props {
  user: User
  isSelected: boolean
  onPressHandler: (event: GestureResponderEvent) => void
}

export const ReceiveUserItem = observer(function ReceiveUserItem({
  user,
  onPressHandler,
  isSelected,
}: Props) {
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <List.Item
        key={user.id}
        style={{
          ...Style.Container,
          backgroundColor: isSelected ? color.palette.darkBlack : color.transparent,
        }}
        background={color.transparent}
        titleStyle={Style.ItemTitle}
        descriptionStyle={Style.ItemDescription}
        title={`${user.firstName} ${user.lastName}`}
        description={user.email}
        left={(props) => (
          <View style={{ justifyContent: "center" }}>
            <Avatar.Image
              {...props}
              source={{
                uri: user.avatar,
              }}
              size={40}
            />
          </View>
        )}
      />
    </TouchableOpacity>
  )
})
