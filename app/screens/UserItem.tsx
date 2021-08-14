import React from "react"
import { observer } from "mobx-react-lite"
import { Avatar, List } from "react-native-paper"
import { color } from "../theme"
import { Style } from "./UserItem.style"
import { User } from "../models/user/user"
import { GestureResponderEvent, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Props {
  user: User
  onPressHandler: (event: GestureResponderEvent) => void
}

export const UserItem = observer(function UserItem({ user, onPressHandler }: Props) {
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <List.Item
        key={user.id}
        style={{
          ...Style.Container,
          backgroundColor: color.transparent,
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
