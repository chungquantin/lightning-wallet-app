import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./ReceiveInAppRequest.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { formatByUnit } from "../../utils/currency"
import { color } from "../../theme"
import { Avatar } from "react-native-paper"
import { FiatCurrency } from "../../generated/graphql"
import { useStores } from "../../models"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"
import { remove } from "../../utils/storage"
interface ReceiveInAppUserRouteProps extends ParamListBase {
  UserDetail: {
    user: {
      id: string
      username: string
      avatar: string
    }
    description: string
    amount: number
    currency: FiatCurrency
  }
}

export const ReceiveInAppRequestScreen = observer(function ReceiveInAppRequestScreen() {
  const [loading, setLoading] = React.useState(false)
  const route = useRoute<RouteProp<ReceiveInAppUserRouteProps, "UserDetail">>()
  const { user, description, amount, currency } = route.params
  const { walletStore } = useStores()
  const navigator = useNavigation()

  const RenderTopContainer = React.memo(() => (
    <>
      {user && (
        <View
          style={{
            marginBottom: 50,
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
      <Text style={Style.AmountText}>{`${formatByUnit(amount, currency, false)} ${currency}`}</Text>
      <View style={Style.DescriptionText}>
        <Text tx="common.form.description.label" />
        <Text>: </Text>
        <Text style={{ color: color.palette.green }}>{description}</Text>
      </View>
    </>
  ))

  const RenderBottomContainer = React.memo(() => (
    <>
      <View style={Style.ButtonContainer}>
        <Button onPress={handler.Confirm} style={Style.ConfirmButton}>
          <Text style={Style.ButtonText} tx="common.confirm" />
        </Button>
        <Button onPress={handler.Cancel} style={Style.CancelButton}>
          <Text style={Style.ButtonText} tx="common.cancel" />
        </Button>
      </View>
    </>
  ))

  const handler = {
    Confirm: async () => {
      setLoading(true)
      const sendPaymentRequest = await walletStore.sendPaymentRequest({
        amount,
        currency,
        description,
        method: "",
        userId: user.id,
      })
      if (sendPaymentRequest?.success) {
        setLoading(false)
        remove(STORAGE_KEY.REQUESTED_TRANSACTIONS)
        navigator.navigate("TransactionComplete", route.params)
      }
    },
    Cancel: () => navigator.goBack(),
  }

  return (
    <View testID="ReceiveInAppRequestScreen" style={Style.Container}>
      <Screen unsafe={true} style={Style.Container}>
        <View style={Style.InnerContainer}>
          {loading ? (
            <NeutronpaySpinner />
          ) : (
            <>
              <RenderTopContainer />
              <RenderBottomContainer />
            </>
          )}
        </View>
      </Screen>
    </View>
  )
})
