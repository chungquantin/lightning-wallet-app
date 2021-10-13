import React from "react"
import { FlatList, Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Profile.style"
import { Avatar } from "react-native-paper"
import { useStores } from "../../models"
import { color } from "../../theme"
import moment from "moment"

const ListItem = ({ children, text }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    }}
  >
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 13,
      }}
    >
      {text}
    </Text>
    {children}
  </View>
)

export const ProfileScreen = observer(function ProfileScreen() {
  const { userStore } = useStores()
  const currentUser = userStore.currentUser
  const handler = {
    ChangeAvatar: () => {},
  }

  const settingList = [
    {
      label: "Name",
      content: currentUser.name,
    },
    {
      label: "KYC level",
      content: "Level 1",
    },
    {
      label: "Email address",
      content: currentUser.email,
    },
    {
      label: "Phone number",
      content: currentUser.phoneNumber,
    },
    {
      label: "Created date",
      content: moment.unix(parseInt(currentUser.createdAt)).format("DD-MM-YYYY"),
    },
  ]
  return (
    <View testID="ProfileScreen" style={Style.Container}>
      <Screen unsafe={true} preset="scroll">
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
          <Avatar.Image
            source={{
              uri:
                currentUser.avatar ||
                "https://pbs.twimg.com/profile_images/1197512896063787008/8Cagjqvn_400x400.jpg",
            }}
            size={90}
          />
          <Pressable onPress={handler.ChangeAvatar}>
            <Text style={{ marginTop: 20, color: color.primary }}>Change Avatar</Text>
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: color.secondaryBackground,
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <FlatList
            data={settingList}
            renderItem={({ item }) => (
              <ListItem text={item.label}>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  {item.content}
                </Text>
              </ListItem>
            )}
          />
        </View>
      </Screen>
    </View>
  )
})
