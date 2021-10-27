import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./UserDetail.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ActivityIndicator, Avatar } from "react-native-paper"
import { isAlive } from "mobx-state-tree"
import moment from "moment"
import { useStores } from "../../models"
import { color } from "../../theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { TextInput } from "react-native-gesture-handler"

interface UserDetailRouteProps extends ParamListBase {
  UserDetail: {
    id: string
  }
}

export const UserDetailScreen = observer(function UserDetailScreen() {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const route = useRoute<RouteProp<UserDetailRouteProps, "UserDetail">>()
  const navigator = useNavigation()
  const { walletStore, userStore } = useStores()
  const { id } = route.params

  React.useEffect(() => {
    const fetchContactDetail = async () => {
      setLoading(true)
      const fetchContactResponse = await userStore.fetchContact(id)
      if (fetchContactResponse.success) {
        const user = userStore.contact
        navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })
        setLoading(false)
      }
    }
    fetchContactDetail()
  }, [id])

  isAlive(userStore.contact)

  const handler = {
    RemoveContact: () => {
      setButtonLoading(true)
      setButtonLoading(false)
    },
    Send: () =>
      navigator.navigate("TransactionAmountCreation", {
        description: `${userStore.currentUser.name} 💰 ${userStore.contact.username || "Unknown"}`,
        action: "SEND",
        type: "IN_APP",
        user: {
          id: userStore.contact.id,
          name: `${userStore.contact.firstName} ${userStore.contact.lastName}`,
          avatar: userStore.contact.avatar,
        },
      }),
    Receive: () =>
      navigator.navigate("TransactionAmountCreation", {
        description: `${userStore.contact.username || "Unknown"} 💰 ${userStore.currentUser.name}`,
        action: "RECEIVE",
        type: "IN_APP",
        user: {
          id: userStore.contact.id,
          name: `${userStore.contact.firstName} ${userStore.contact.lastName}`,
          avatar: userStore.contact.avatar,
        },
      }),
  }

  const RenderUserMetadata = () => (
    <>
      <Avatar.Image
        source={{
          uri:
            userStore.contact.avatar ||
            "https://cdn.dribbble.com/users/1786866/screenshots/13992097/media/c461eeae4d4b523c9d3bab7c66264916.png?compress=1&resize=400x300",
        }}
        size={140}
        style={{
          marginBottom: 40,
          marginTop: 50,
        }}
      />
      <View style={Style.RowItemContainer}>
        <Text style={{ fontWeight: "bold" }} tx="common.form.username.label" />
        <Text>{userStore.contact.username || "Unknown"}</Text>
      </View>
      <View style={Style.RowItemContainer}>
        <Text style={{ fontWeight: "bold" }} tx="common.form.email.label" />
        <Text>{userStore.contact.email}</Text>
      </View>
      <View style={Style.RowItemContainer}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>{userStore.contact.firstName} </Text>
          <Text>{userStore.contact.lastName}</Text>
        </View>
      </View>
      <View style={Style.RowItemContainer}>
        <Text style={{ fontWeight: "bold" }}>Join at</Text>
        <Text>{moment(parseInt(userStore.contact.createdAt)).format("DD-MM-YYYY")}</Text>
      </View>
      <View style={Style.RowItemContainer}>
        <Text style={{ fontWeight: "bold" }}>Mutual transactions</Text>
        <Text>
          {
            walletStore.transactions.filter(
              (transaction) =>
                transaction.toWalletId === userStore.contact.id ||
                transaction.fromWalletId === userStore.contact.id,
            ).length
          }
        </Text>
      </View>
    </>
  )

  const RenderButtonContainer = () => (
    <>
      <View style={{ flexDirection: "row", paddingHorizontal: 25, marginTop: 30 }}>
        <Button
          style={{
            backgroundColor: color.secondaryBackground,
            height: 50,
            flex: 1,
            flexDirection: "row",
          }}
          disabled={buttonLoading}
          onPress={handler.Send}
        >
          <MaterialCommunityIcons name="cash-plus" color={color.palette.offWhite} size={24} />
          <Text style={{ marginLeft: 10 }}>Send</Text>
        </Button>
        <View style={{ width: 10 }} />
        <Button
          style={{
            backgroundColor: color.secondaryBackground,
            height: 50,
            flex: 1,
            flexDirection: "row",
          }}
          disabled={buttonLoading}
          onPress={handler.Receive}
        >
          <MaterialCommunityIcons name="cash-minus" color={color.palette.offWhite} size={24} />
          <Text style={{ marginLeft: 10 }}>Receive</Text>
        </Button>
      </View>
      <View
        style={{
          marginTop: 15,
          width: "100%",
          paddingHorizontal: 25,
        }}
      >
        <Button
          style={{
            backgroundColor: color.primary,
            height: 40,
          }}
          disabled={buttonLoading}
          onPress={handler.RemoveContact}
        >
          {buttonLoading ? <ActivityIndicator color={color.palette.white} /> : <Text>Remove</Text>}
        </Button>
      </View>
    </>
  )

  return (
    <View testID="UserDetailScreen" style={Style.Container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          <NeutronpaySpinner />
        ) : (
          <>
            <RenderUserMetadata />
            <RenderButtonContainer />
          </>
        )}
      </View>
    </View>
  )
})
