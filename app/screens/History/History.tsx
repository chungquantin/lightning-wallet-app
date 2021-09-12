import React from "react"
import { SectionList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./History.style"
import { LineChart, PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { color } from "../../theme"
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes"
import { useStores } from "../../models"
import { TransactionItem } from "../TransactionItem"
import { useNavigation } from "@react-navigation/native"
import { Transaction } from "../../models/transaction/transaction"
import { Ionicons } from "@expo/vector-icons"
import { FlatList, TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import useFormValidation from "../../hooks/useFormValidation"
import { TouchableRipple } from "react-native-paper"
import { useIsFocused } from "@react-navigation/core"

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
  const { transactionStore, walletStore } = useStores()
  const [selectedTab, setSelectedTab] = React.useState(1)
  const isFocused = useIsFocused()
  const screenWidth = Dimensions.get("window").width
  const transactionList = transactionStore.groupTransactionByMonthAndYear()
  const transactionIncomeList = transactionStore.incomeTransactionByMonthAndYear
  const transactionExpenseList = transactionStore.expenseTransactionByMonthAndYear
  const { formValues, handleSetFieldValue } = useFormValidation<{
    transactionDescription: string
  }>({
    transactionDescription: "",
  })
  const navigator = useNavigation()
  const pieChartData = [
    {
      name: "Income",
      population: transactionStore.incomeTransactions
        .map((transaction) => transaction.amount)
        .reduce((a, b) => a + b),
      color: color.palette.purple,
      legendFontColor: color.text,
      legendFontSize: 15,
    },
    {
      name: "Expense",
      population: transactionStore.expenseTransactions
        .map((transaction) => transaction.amount)
        .reduce((a, b) => a + b),
      color: color.palette.darkPurple,
      legendFontColor: color.text,
      legendFontSize: 15,
    },
  ]
  const lineChartDate = {
    labels: (selectedTab === 2 ? transactionIncomeList : transactionExpenseList)
      .map((transaction) => transaction.month)
      .reverse(),
    datasets: [
      {
        data: (selectedTab === 2 ? transactionIncomeList : transactionExpenseList)
          .map((transaction) => transaction.data.map((data) => data.amount).reduce((a, b) => a + b))
          .reverse(),
      },
    ],
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
  const RenderPieChart = () => (
    <View style={{ ...Style.ChartContainer, paddingVertical: 15 }}>
      <PieChart
        data={pieChartData}
        width={screenWidth - 100}
        height={120}
        chartConfig={chartConfig}
        accessor={"population"}
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
  const RenderLineChart = () => (
    <View style={Style.ChartContainer}>
      <LineChart
        data={lineChartDate}
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
      <SectionList
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
      <Screen preset="scroll">
        {selectedTab == 1 ? <RenderPieChart /> : <RenderLineChart />}
        <RenderSearchInputContainer />
        <RenderTransactionContainer />
      </Screen>
    </View>
  )
})
