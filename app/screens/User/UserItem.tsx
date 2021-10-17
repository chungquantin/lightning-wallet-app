import React from "react"
import { observer } from "mobx-react-lite"
import { Avatar, List } from "react-native-paper"
import { color } from "../../theme"
import { Style } from "./UserItem.style"
import { User } from "../../models/user/user"
import { GestureResponderEvent, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { isAlive } from "mobx-state-tree"

interface Props {
  user: User
  onPressHandler: (event: GestureResponderEvent) => void
  style?: any
}

export const UserItem = observer(function UserItem({ user, onPressHandler, style }: Props) {
  isAlive(user)

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <List.Item
        key={user.id}
        style={{
          ...Style.Container,
          ...style,
          backgroundColor: color.transparent,
        }}
        background={color.transparent}
        titleStyle={Style.ItemTitle}
        descriptionStyle={Style.ItemDescription}
        title={`${user.username}`}
        description={`${user.email}`}
        left={(props) => (
          <View style={{ justifyContent: "center" }}>
            <Avatar.Image
              {...props}
              source={{
                uri:
                  user.avatar ||
                  "https://cdn.dribbble.com/users/1786866/screenshots/13992097/media/c461eeae4d4b523c9d3bab7c66264916.png?compress=1&resize=400x300",
              }}
              size={50}
            />
          </View>
        )}
      />
    </TouchableOpacity>
  )
})
