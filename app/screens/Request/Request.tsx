import React from "react"
import { Dimensions, SectionList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { AutoImage, Screen, Text } from "../../components"
import Style from "./Request.style"
import { useStores } from "../../models"
import { useIsFocused, useNavigation } from "@react-navigation/core"
import { color, textStyle } from "../../theme"
import { Ionicons } from "@expo/vector-icons"
import { TouchableRipple } from "react-native-paper"
import { FlatList, TextInput } from "react-native-gesture-handler"
import { TransactionRequestStatus } from "../../generated/graphql"
import { stringUtil } from "../../utils"
import I18n from "i18n-js"
import { TransactionItem } from "../Transaction/TransactionItem"
import useFormValidation from "../../hooks/useFormValidation"
import { Transaction } from "../../models/transaction/transaction"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { load, save } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

const NoTransactionIcon = require("../../../assets/images/icons/No-Transaction-Icon.png")

export const RequestScreen = observer(function RequestScreen() {
  const [loading, setLoading] = React.useState(false)
  const [selectedTab, setSelectedTab] = React.useState(1)
  const { walletStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()
  const transactionList = walletStore.groupTransactionByMonthAndYear(
    walletStore.requestedTransactions,
  )
  const pendingTransactionList = walletStore.filterGroupedTransactionByStatus(
    TransactionRequestStatus.Pending,
  )
  const confirmedTransactionList = walletStore.filterGroupedTransactionByStatus(
    TransactionRequestStatus.Confirmed,
  )
  const canceledTransactionList = walletStore.filterGroupedTransactionByStatus(
    TransactionRequestStatus.Canceled,
  )
  const rejectedTransactionList = walletStore.filterGroupedTransactionByStatus(
    TransactionRequestStatus.Rejected,
  )
  const { formValues, handleSetFieldValue } = useFormValidation<{
    transactionDescription: string
  }>({
    transactionDescription: "",
  })

  React.useEffect(() => {
    const fetchData = async () => {
      const requestedTransactionsCache = await load(STORAGE_KEY.REQUESTED_TRANSACTIONS)
      if (!requestedTransactionsCache) {
        setLoading(true)
        const fetchTransactionsResponse = await walletStore.fetchRequestedTransactions()
        if (fetchTransactionsResponse) {
          setLoading(false)
          save(STORAGE_KEY.REQUESTED_TRANSACTIONS, fetchTransactionsResponse.success)
        }
      }
    }
    fetchData()
  }, [isFocused])

  const handler = {
    SwitchTab: (tabId) => setSelectedTab(tabId),
    OpenTransactionDetail: (transaction: Transaction) =>
      navigator.navigate("RequestedTransactionDetail", {
        transaction,
      }),
  }

  const RenderTabButtonContainer = () => (
    <View>
      <FlatList
        style={Style.ButtonContainer}
        horizontal
        data={[
          {
            id: 1,
            title: "All",
          },
          {
            id: 2,
            title: stringUtil.capitalize(TransactionRequestStatus.Pending),
          },
          {
            id: 3,
            title: stringUtil.capitalize(TransactionRequestStatus.Confirmed),
          },
          {
            id: 4,
            title: stringUtil.capitalize(TransactionRequestStatus.Rejected),
          },
          {
            id: 5,
            title: stringUtil.capitalize(TransactionRequestStatus.Canceled),
          },
        ]}
        renderItem={({ item }) => {
          const isSelected = selectedTab === item.id
          return (
            <TouchableRipple onPress={() => handler.SwitchTab(item.id)}>
              <View
                style={{
                  ...Style.TabContainer,
                  marginRight: item.id === 6 ? 0 : 10,
                  backgroundColor: isSelected ? color.primary : color.secondaryBackground,
                }}
              >
                {item.id === 2 && (
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="time-outline"
                    size={15}
                    color={isSelected ? color.palette.white : color.palette.offGray}
                  />
                )}
                {item.id === 3 && (
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="checkmark"
                    size={15}
                    color={isSelected ? color.palette.white : color.palette.offGray}
                  />
                )}
                {item.id === 4 && (
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="trash-bin-outline"
                    size={15}
                    color={isSelected ? color.palette.white : color.palette.offGray}
                  />
                )}
                <Text
                  style={{
                    ...Style.TabButtonText,
                    color: isSelected ? color.palette.white : color.palette.offGray,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableRipple>
          )
        }}
      />
    </View>
  )

  const RenderSearchInputContainer = () => (
    <View>
      <Text tx="common.form.transaction.label" style={Style.InputLabel} />
      <View style={Style.SearchContainer}>
        <Ionicons
          style={Style.SearchIcon}
          name="search"
          size={15}
          color={color.palette.lightGray}
        />
        <TextInput
          style={Style.InputField}
          placeholderTextColor={color.palette.offGray}
          placeholder={I18n.t("common.form.transaction.placeholder")}
          onChangeText={(text) => handleSetFieldValue("transactionDescription", text)}
          value={formValues.transactionDescription}
        />
      </View>
    </View>
  )
  const RenderEmptySection = () => (
    <View style={Style.EmptySectionContainer}>
      <Text style={Style.EmptySectionHeader}>Uh-oh!</Text>
      <AutoImage
        style={Style.EmptySectionImage}
        width={Dimensions.get("screen").width}
        height={130}
        source={NoTransactionIcon}
        defaultSource={NoTransactionIcon}
      />
      <Text
        style={{
          ...textStyle.subheader,
        }}
        tx="common.empty.transaction"
      />
    </View>
  )

  const RenderTransactionContainer = () => (
    <View style={Style.BottomContainer}>
      {transactionList.length === 0 ? (
        <RenderEmptySection />
      ) : (
        <SectionList
          ListEmptyComponent={() => <RenderEmptySection />}
          scrollEnabled={false}
          sections={(() => {
            switch (selectedTab) {
              case 1:
                return transactionList
              case 2:
                return pendingTransactionList
              case 3:
                return confirmedTransactionList
              case 4:
                return rejectedTransactionList
              case 5:
                return canceledTransactionList
              default:
                return transactionList
            }
          })()}
          renderSectionHeader={({ section: { month, year } }) => (
            <View style={Style.BottomTransactionLabelContainer}>
              <Text style={Style.BottomTransactionLabelText}>{month}</Text>
              <Text style={Style.BottomTransactionLabelText}>{year}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              onPressHandler={() => handler.OpenTransactionDetail(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )

  return (
    <View testID="RequestScreen" style={Style.Container}>
      <RenderTabButtonContainer />
      <RenderSearchInputContainer />
      {loading ? (
        <NeutronpaySpinner style={{ marginTop: -100 }} />
      ) : (
        <>
          <Screen unsafe={true} preset="scroll">
            <RenderTransactionContainer />
          </Screen>
        </>
      )}
    </View>
  )
})
