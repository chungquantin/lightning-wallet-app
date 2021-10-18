import React from "react"
import { Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./Profile.style"
import { Avatar } from "react-native-paper"
import { useStores } from "../../models"
import { color } from "../../theme"
import moment from "moment"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { useIsFocused } from "@react-navigation/core"

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
  const [loading, setLoading] = React.useState(false)
  const isFocused = useIsFocused()
  const currentUser = userStore.currentUser
  const handler = {
    ChangeAvatar: () => {},
  }

  const settingList = [
    {
      label: "Username",
      content: currentUser.username || "Unknown",
    },
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
    // {
    //   label: "Phone number",
    //   content: currentUser.phoneNumber,
    // },
    {
      label: "Created date",
      content: moment.unix(parseInt(currentUser.createdAt)).format("DD-MM-YYYY"),
    },
  ]

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true)
      const fetchCurrentUserResponse = await userStore.fetchCurrentUser()
      if (fetchCurrentUserResponse.success) {
        setLoading(false)
      }
    }
    fetchCurrentUser()
  }, [isFocused])

  return (
    <View testID="ProfileScreen" style={Style.Container}>
      {loading ? (
        <NeutronpaySpinner />
      ) : (
        <Screen unsafe={true} preset="fixed">
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
            {settingList.map((settingItem) => (
              <ListItem text={settingItem.label} key={settingItem.label}>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  {settingItem.content}
                </Text>
              </ListItem>
            ))}
          </View>
        </Screen>
      )}
    </View>
  )
})
