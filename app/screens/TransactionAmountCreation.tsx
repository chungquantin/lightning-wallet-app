import React from "react"
import { FlatList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../components"
import Style from "./TransactionAmountCreation.style"
import { Calculator } from "./Calculator"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import getSymbolFromCurrency from "currency-symbol-map"
import { formatByUnit, getListCurrency, translateCurrency } from "../utils/currency"
import { TouchableRipple, Portal, Modal } from "react-native-paper"
import useFormValidation from "../hooks/useFormValidation"
import { useStores } from "../models"
import { color } from "../theme"

interface TransactionAmountCreationRouteProps extends ParamListBase {
  InvoiceDetail: {
    user: {
      name: string
      avatar: string
    }
    description: string
    action: "RECEIVE" | "SEND"
    type: "IN_APP" | "OUT_APP"
    address: string
    method: "ON_CHAIN" | "LIGHTNING"
  }
}

export const TransactionAmountCreationScreen = observer(function TransactionAmountCreationScreen() {
  const { walletStore } = useStores()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    amount: number
    currency: string
  }>({
    amount: 0,
    currency: walletStore.wallet.defaultCurrency,
  })
  const route = useRoute<RouteProp<TransactionAmountCreationRouteProps, "InvoiceDetail">>()
  const { action, type, description, address, method, user } = route.params
  const [toggleModal, setToggleModal] = React.useState(false)
  const navigator = useNavigation()

  const handler = {
    OpenMenu: () => setToggleModal(true),
    CloseMenu: () => setToggleModal(false),
    SwitchCurrency: (currency) => handleSetFieldValue("currency", currency),
    Next: () => {
      const payload = {
        description: description,
        amount: formValues.amount,
        currency: formValues.currency,
      }
      switch (action) {
        case "RECEIVE":
          return type === "IN_APP"
            ? navigator.navigate("ReceiveInAppRequest", payload)
            : navigator.navigate("ReceiveOutAppRequest", payload)
        case "SEND":
          return type === "IN_APP"
            ? navigator.navigate(
                "TransactionConfirm",
                Object.assign(payload, {
                  user,
                }),
              )
            : navigator.navigate(
                "TransactionConfirm",
                Object.assign(payload, {
                  address,
                  method,
                }),
              )
        default:
          break
      }
    },
  }

  const disableCondition =
    formValues.amount > walletStore.wallet.balance ? color.error : color.palette.white

  const RenderUpperContainer = () => (
    <View style={Style.UpperContainer}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text tx="common.form.description.label" />
        <Text>: {description}</Text>
      </View>
      <View style={Style.AmountContainer}>
        <Text
          style={{
            ...Style.CurrencySymbol,
            fontSize:
              formValues.amount < 1000
                ? Style.CurrencySymbol.fontSize
                : formValues.amount < 100000
                ? 35
                : 25,
            color: disableCondition,
          }}
        >
          {getSymbolFromCurrency(formValues.currency)}
        </Text>
        <Text
          style={{
            ...Style.AmountText,
            fontSize:
              formValues.amount < 1000
                ? Style.AmountText.fontSize
                : formValues.amount < 100000
                ? 50
                : 40,
            color: disableCondition,
          }}
        >
          {formatByUnit(formValues.amount, formValues.currency, false, false)}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={Style.MaxAmountText}>Max: </Text>
        <Text style={Style.MaxAmountText}>
          {formatByUnit(walletStore.wallet.balance, walletStore.wallet.defaultCurrency)}
        </Text>
      </View>

      <Button style={Style.ButtonContainer} onPress={handler.OpenMenu}>
        <Text style={Style.ButtonPlaceholder}>{formValues.currency}</Text>
      </Button>
    </View>
  )
  const RenderCurrencyModal = () => (
    <Portal>
      <Modal
        visible={toggleModal}
        onDismiss={handler.CloseMenu}
        contentContainerStyle={{ paddingHorizontal: 30 }}
      >
        <View style={Style.ModalContainer}>
          <Text
            tx="common.currency"
            style={{ fontWeight: "bold", marginBottom: 10, fontSize: 18, marginTop: 15 }}
          />
          <FlatList
            data={getListCurrency}
            renderItem={({ item, index }) => (
              <TouchableRipple
                onPress={() => {
                  handler.CloseMenu()
                  handler.SwitchCurrency(item)
                }}
              >
                <View
                  key={item}
                  style={{
                    ...Style.CurrencyItem,
                    borderBottomColor:
                      index === getListCurrency.length - 1 ? color.transparent : color.borderLight,
                  }}
                >
                  <Text
                    style={
                      item === formValues.currency ? Style.ButtonPlaceholder : Style.MenuItemNormal
                    }
                  >
                    {item}
                  </Text>
                  <Text
                    style={
                      item === formValues.currency ? Style.ButtonPlaceholder : Style.MenuItemNormal
                    }
                  >
                    {translateCurrency[item].text}
                  </Text>
                </View>
              </TouchableRipple>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
    </Portal>
  )
  return (
    <View testID="TransactionAmountCreationScreen" style={Style.Container}>
      <RenderUpperContainer />
      <Calculator
        formValues={formValues}
        onChangeEvent={handleSetFieldValue}
        submitButtonDisabled={formValues.amount <= 0}
        onSubmitEvent={handler.Next}
      />
      <RenderCurrencyModal />
    </View>
  )
})
