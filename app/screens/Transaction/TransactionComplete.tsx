import React from "react"
import { Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./TransactionComplete.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../../models/user/user"
import { formatByUnit } from "../../utils/currency"
import { color } from "../../theme"
import { Avatar } from "react-native-paper"

interface TransactionCompleteRouteProps extends ParamListBase {
  TransactionDetail: {
    user: User
    amount: number
    currency: string
    method: "ON_CHAIN" | "LIGHTNING"
    description: string
    action: "RECEIVE" | "SEND"
  }
}

export const TransactionCompleteScreen = observer(function TransactionCompleteScreen() {
  const route = useRoute<RouteProp<TransactionCompleteRouteProps, "TransactionDetail">>()
  const { user, amount, currency, method, description, action } = route.params
  const navigator = useNavigation()

  const RenderTopContainer = React.memo(() => (
    <>
      {user && (
        <View
          style={{
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar.Image
            source={{
              uri:
                user.avatar ||
                "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/d07bca98931623.5ee79b6a8fa55.jpg",
            }}
            size={100}
            style={{
              marginBottom: 20,
            }}
          />
          <Text style={{ fontSize: 18 }}>{user.username || "Unknown"}</Text>
        </View>
      )}
      <View style={Style.DescriptionText}>
        {method && (
          <>
            <Text tx="common.method" />
            <Text>{method === "ON_CHAIN" ? ": On-chain" : ": Lightning"}</Text>
          </>
        )}
      </View>
      <Text style={Style.AmountText}>{`${formatByUnit(amount, currency, false)} ${currency}`}</Text>
      <View style={Style.DescriptionText}>
        <Text tx="common.form.description.label" />
        <Text>: </Text>
        <Text style={{ color: color.palette.green }}>{description}</Text>
      </View>
    </>
  ))

  const handler = {
    Done: () => navigator.navigate("Wallet"),
  }

  return (
    <View testID="TransactionCompleteScreen" style={Style.Container}>
      <Screen unsafe={true} style={Style.Container}>
        <View style={Style.InnerContainer}>
          <RenderTopContainer />
          <Text
            style={{
              fontSize: Dimensions.get("screen").width / 3,
              marginTop: 50,
              marginBottom: 80,
            }}
          >
            {action === "RECEIVE" ? "💰" : "🎉"}
          </Text>
          <View style={{ width: Dimensions.get("screen").width, paddingHorizontal: 35 }}>
            <Button onPress={handler.Done} style={{ height: 50, backgroundColor: color.primary }}>
              <Text tx="common.done" />
            </Button>
          </View>
        </View>
      </Screen>
    </View>
  )
})
