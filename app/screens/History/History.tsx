import React from "react"
import { SectionList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { AutoImage, Screen, Text } from "../../components"
import Style from "./History.style"
import { LineChart, PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { color, textStyle } from "../../theme"
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes"
import { useStores } from "../../models"
import { TransactionItem } from "../Transaction/TransactionItem"
import { useNavigation } from "@react-navigation/native"
import { Transaction } from "../../models/transaction/transaction"
import { Ionicons } from "@expo/vector-icons"
import { FlatList, TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import useFormValidation from "../../hooks/useFormValidation"
import { TouchableRipple } from "react-native-paper"
import { useIsFocused } from "@react-navigation/core"
import getSymbolFromCurrency from "currency-symbol-map"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { load, save } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

const NoTransactionIcon = require("../../../assets/images/icons/No-Transaction-Icon.png")

const chartConfig: ChartConfig = {
  backgroundGradientFrom: color.secondaryBackground,
  backgroundGradientTo: color.secondaryBackground,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    alignItems: "center",
    borderRadius: 16,
  },
  propsForDots: {
    r: "2.8",
    strokeWidth: "5.5",
    stroke: color.primary,
  },
}

export const HistoryScreen = observer(function HistoryScreen() {
  const [loading, setLoading] = React.useState(false)
  const { walletStore, userStore } = useStores()
  const [selectedTab, setSelectedTab] = React.useState(1)
  const isFocused = useIsFocused()
  const screenWidth = Dimensions.get("window").width
  const transactionList = walletStore.groupTransactionByMonthAndYear()
  const transactionIncomeList = walletStore.incomeTransactionByMonthAndYear
  const transactionExpenseList = walletStore.expenseTransactionByMonthAndYear
  const { formValues, handleSetFieldValue } = useFormValidation<{
    transactionDescription: string
  }>({
    transactionDescription: "",
  })
  const navigator = useNavigation()
  const pieChartData = [
    {
      name: "Income",
      transactions:
        walletStore.incomeTransactions.length > 0
          ? walletStore.incomeTransactions
              .map((transaction) => transaction.amount)
              .reduce((a, b) => a + b)
          : 0,
      color: color.palette.purple,
      legendFontColor: color.text,
      legendFontSize: 15,
    },
    {
      name: "Expense",
      transactions:
        walletStore.expenseTransactions.length > 0
          ? walletStore.expenseTransactions
              .map((transaction) => transaction.amount)
              .reduce((a, b) => a + b)
          : 0,
      color: color.palette.darkPurple,
      legendFontColor: color.text,
      legendFontSize: 15,
    },
  ]
  const incomeLineChartData = {
    labels: transactionIncomeList.map((transaction) => transaction.month).reverse(),
    datasets: [
      {
        data: transactionIncomeList
          .map((transaction) => transaction.data.map((data) => data.amount).reduce((a, b) => a + b))
          .reverse(),
      },
    ],
  }
  const expenseLineChartData = {
    labels: transactionExpenseList.map((transaction) => transaction.month).reverse(),
    datasets: [
      {
        data: transactionExpenseList
          .map((transaction) => transaction.data.map((data) => data.amount).reduce((a, b) => a + b))
          .reverse(),
      },
    ],
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const transactionsCache = await load(STORAGE_KEY.TRANSACTIONS)
      if (!transactionsCache) {
        setLoading(true)
        const fetchTransactionsResponse = await walletStore.fetchTransactions()
        if (fetchTransactionsResponse.success) {
          save(STORAGE_KEY.TRANSACTIONS, fetchTransactionsResponse.data)
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [isFocused])

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
            title: "Income",
          },
          {
            id: 3,
            title: "Expense",
          },
        ]}
        renderItem={({ item }) => {
          const isSelected = selectedTab === item.id
          return (
            <TouchableRipple onPress={() => handler.SwitchTab(item.id)}>
              <View
                style={{
                  ...Style.TabContainer,
                  marginRight: item.id === 3 ? 0 : 10,
                  backgroundColor: isSelected ? color.primary : color.secondaryBackground,
                }}
              >
                {item.id === 2 && (
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="arrow-up-circle"
                    size={15}
                    color={isSelected ? color.palette.white : color.palette.offGray}
                  />
                )}
                {item.id === 3 && (
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="arrow-down-circle"
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
  const RenderPieChart = () =>
    transactionList.length > 0 && (
      <View style={{ ...Style.ChartContainer, paddingVertical: 15 }}>
        <PieChart
          data={pieChartData}
          width={screenWidth - 100}
          height={120}
          chartConfig={chartConfig}
          accessor={"transactions"}
          backgroundColor={"transparent"}
          paddingLeft={"-20"}
          style={{
            alignItems: "center",
            borderRadius: 20,
            marginRight: 10,
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
  const RenderLineChart = () =>
    selectedTab === 2
      ? transactionIncomeList.length > 0 && (
          <View style={Style.ChartContainer}>
            <LineChart
              data={incomeLineChartData}
              width={screenWidth - 80} // from react-native
              height={200}
              yAxisLabel={getSymbolFromCurrency(walletStore.wallet.defaultCurrency)}
              chartConfig={chartConfig}
              bezier
              style={{
                alignItems: "center",
                borderRadius: 20,
              }}
            />
          </View>
        )
      : transactionExpenseList.length > 0 && (
          <View style={Style.ChartContainer}>
            <LineChart
              data={expenseLineChartData}
              width={screenWidth - 80} // from react-native
              height={200}
              yAxisLabel={"$"}
              chartConfig={chartConfig}
              bezier
              style={{
                alignItems: "center",
                borderRadius: 20,
              }}
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
          sections={
            selectedTab === 1
              ? transactionList
              : selectedTab === 2
              ? transactionIncomeList
              : transactionExpenseList
          }
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

  const handler = {
    OpenTransactionDetail: (transaction: Transaction) =>
      navigator.navigate("TransactionDetail", {
        transaction,
      }),
    SwitchTab: (tabId) => setSelectedTab(tabId),
  }

  return (
    <View testID="HistoryScreen" style={Style.Container}>
      <RenderTabButtonContainer />
      {loading ? (
        <NeutronpaySpinner style={{ marginTop: -110 }} />
      ) : (
        <>
          <Screen preset="scroll">
            <RenderSearchInputContainer />

            {selectedTab == 1 ? (
              transactionList.length !== 0 && <RenderPieChart />
            ) : (
              <RenderLineChart />
            )}
            <RenderTransactionContainer />
          </Screen>
        </>
      )}
    </View>
  )
})
