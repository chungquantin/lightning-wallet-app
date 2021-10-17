import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./UserDetail.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../../models/user/user"
import { ActivityIndicator, Avatar } from "react-native-paper"
import { isAlive } from "mobx-state-tree"
import moment from "moment"
import { useStores } from "../../models"
import { color } from "../../theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface UserDetailRouteProps extends ParamListBase {
  UserDetail: {
    user: User
  }
}

export const UserDetailScreen = observer(function UserDetailScreen() {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const route = useRoute<RouteProp<UserDetailRouteProps, "UserDetail">>()
  const navigator = useNavigation()
  const { walletStore } = useStores()
  const { user } = route.params

  React.useEffect(() => {
    if (user) {
      navigator.setOptions({ headerTitle: `${user.firstName} ${user.lastName}` })
    }
  }, [user])

  isAlive(user)

  const handler = {
    RemoveContact: () => {
      setButtonLoading(true)
      setButtonLoading(false)
    },
  }

  return (
    <View testID="UserDetailScreen" style={Style.Container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image
          source={{
            uri:
              user.avatar ||
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
          <Text>{user.username || "Unknown"}</Text>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }} tx="common.form.email.label" />
          <Text>{user.email}</Text>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{user.firstName} </Text>
            <Text>{user.lastName}</Text>
          </View>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }}>Join at</Text>
          <Text>{moment(parseInt(user.createdAt)).format("DD-MM-YYYY")}</Text>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }}>Mutual transactions</Text>
          <Text>
            {
              walletStore.transactions.filter(
                (transaction) =>
                  transaction.toWalletId === user.id || transaction.fromWalletId === user.id,
              ).length
            }
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
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
            {buttonLoading ? (
              <ActivityIndicator color={color.palette.white} />
            ) : (
              <Text>Remove</Text>
            )}
          </Button>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 25, marginTop: 15 }}>
          <Button
            style={{
              backgroundColor: color.secondaryBackground,
              height: 50,
              flex: 1,
              flexDirection: "row",
            }}
            disabled={buttonLoading}
            onPress={handler.RemoveContact}
          >
            <MaterialCommunityIcons name="cash-plus" color={color.palette.offWhite} size={27} />
            <Text>Send</Text>
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
            onPress={handler.RemoveContact}
          >
            <MaterialCommunityIcons name="cash-minus" color={color.palette.offWhite} size={27} />
            <Text>Receive</Text>
          </Button>
        </View>
      </View>
    </View>
  )
})
