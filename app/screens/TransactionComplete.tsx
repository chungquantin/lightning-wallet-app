import React from "react"
import { Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import Style from "./TransactionComplete.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"
import { formatByUnit } from "../utils/currency"
import { color } from "../theme"

interface TransactionCompleteRouteProps extends ParamListBase {
  TransactionDetail: {
    user: User
    amount: number
    currency: string
    method: "ON_CHAIN" | "LIGHTNING"
  }
}

export const TransactionCompleteScreen = observer(function TransactionCompleteScreen() {
  const route = useRoute<RouteProp<TransactionCompleteRouteProps, "TransactionDetail">>()
  const { user, amount, currency, method } = route.params
  const navigator = useNavigation()

  const RenderTopContainer = React.memo(() => (
    <>
      <View style={Style.DescriptionText}>
        <Text tx="common.method" />
        {method && <Text>{method === "ON_CHAIN" ? ": On-chain" : ": Lightning"}</Text>}
      </View>
      <Text style={Style.AmountText}>{`${formatByUnit(amount, currency, false)} ${currency}`}</Text>
      <View style={Style.DescriptionText}>
        <Text tx="common.networkFee" />
        <Text style={{ color: color.palette.green }}>
          +{`${formatByUnit(1.25, currency, false)} ${currency}`}
        </Text>
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
              marginBottom: 100,
            }}
          >
            🎉
          </Text>
          {user && <Text>{`${user.firstName} ${user.lastName}`}</Text>}
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
