import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../components"
import Style from "./TransactionDetail.style"
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native"
import { Transaction } from "../models/transaction/transaction"
import { User } from "../models/user/user"
import { useStores } from "../models"
import { Avatar } from "react-native-paper"
import { color } from "../theme"
import { formatByUnit } from "../utils/currency"

interface TransactionDetailRouteProps extends ParamListBase {
  TransactionDetail: {
    transaction: Transaction
  }
}

export const TransactionDetailScreen = observer(function TransactionDetailScreen() {
  const route = useRoute<RouteProp<TransactionDetailRouteProps, "TransactionDetail">>()
  const { walletStore } = useStores()
  const [user, setUser] = React.useState<User>()
  const { transaction } = route.params
  const userWalletId =
    transaction.fromWalletId === walletStore.wallet.id
      ? transaction.toWalletId
      : transaction.fromWalletId
  const currentUserWalletId =
    transaction.fromWalletId !== walletStore.wallet.id
      ? transaction.toWalletId
      : transaction.fromWalletId

  React.useEffect(() => {
    const fetchUser = async () => {
      const result = await walletStore.fetchWalletOwner(userWalletId)
      if (result) {
        setUser((user) => (user = result))
      }
    }
    fetchUser()
  }, [transaction])

  const RenderMetaContainer = () => (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Avatar.Image
            source={{
              uri:
                user?.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5byu1xbgoId-eDW2FMh5JIjTe8v15g5NJIMHUj3tJI-KTRP0d_Lk9BYVhZArxLMkO198&usqp=CAU",
            }}
            size={120}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 15 }}>
            {user?.name || "Unknown"}
          </Text>
          <Text style={{ color: color.palette.offWhite, fontSize: 14, marginTop: 3 }}>
            {user?.email || "Unknown"}
          </Text>
        </View>
      </View>
    </View>
  )

  const transactionFieldList = [
    {
      label: "Description",
      content: transaction.description,
    },
    {
      label: "Type",
      content: userWalletId === transaction.fromWalletId ? "In" : "Out",
    },
    {
      label: "Amount",
      content: formatByUnit(transaction.amount, transaction.currency),
    },
    {
      label: "Status",
      content: transaction.status,
    },
    {
      label: "Date",
      content: transaction.createdAt,
    },
    {
      label: "Method",
      content: transaction.method,
    },
    {
      label: "Network Fee",
      content: transaction.networkFee,
    },
    {
      label: "Transaction Fee",
      content: transaction.transactionFee,
    },
  ]
  return (
    <View testID="TransactionDetailScreen" style={Style.Container}>
      <Screen preset="scroll">
        {walletStore.wallet.id === currentUserWalletId ? (
          <View>
            <RenderMetaContainer />

            {transactionFieldList.map((field, index) => (
              <View style={{ ...Style.DetailContainer, marginTop: index === 0 ? 50 : 0 }}>
                <Text style={Style.DetailLabelLeft}>{field.label}</Text>
                <Text>{field.content}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>There is something wrong</Text>
        )}
      </Screen>
    </View>
  )
})
