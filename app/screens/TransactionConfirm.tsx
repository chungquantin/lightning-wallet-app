import React from "react"
import { Clipboard, Dimensions, Share, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import Style from "./TransactionConfirm.style"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { User } from "../models/user/user"
import { formatByUnit } from "../utils/currency"
import { color } from "../theme"
import { Ionicons } from "@expo/vector-icons"
import { Modal, Portal } from "react-native-paper"
import { SnackBarContext } from "../constants/Context"
import I18n from "i18n-js"

interface TransactionConfirmRouteProps extends ParamListBase {
  InvoiceDetail: {
    user: User
    amount: number
    currency: string
    address: string
    method: "ON_CHAIN" | "LIGHTNING"
  }
}

export const TransactionConfirmScreen = observer(function TransactionConfirmScreen() {
  const route = useRoute<RouteProp<TransactionConfirmRouteProps, "InvoiceDetail">>()
  const { onToggleSnackBar, setSnackBar } = React.useContext(SnackBarContext)
  const [toggleModal, setToggleModal] = React.useState(false)
  const { amount, currency, method, address } = route.params
  const navigator = useNavigation()

  const RenderAddressModal = React.memo(() => (
    <Portal>
      <Modal
        visible={toggleModal}
        onDismiss={handler.CloseModal}
        contentContainerStyle={{ paddingHorizontal: 30 }}
      >
        <View style={Style.ModalContainer}>
          <Text
            tx={method === "LIGHTNING" ? "common.lightning.address" : "common.onchain.address"}
            style={{ fontWeight: "bold", marginBottom: 20, fontSize: 18, marginTop: 15 }}
          />
          <Text style={Style.ModalContentText} selectable={true}>
            {address}
          </Text>
          <View style={Style.ModalButtonContainer}>
            <Button onPress={handler.Share} style={{ ...Style.ModalButton, marginRight: 5 }}>
              <Text style={Style.ModalButtonText} tx="common.share" />
              <Ionicons name="share-outline" color={color.palette.white} size={20} />
            </Button>
            <Button onPress={handler.CopyText} style={Style.ModalButton}>
              <Text style={Style.ModalButtonText} tx="common.copy" />
              <Ionicons name="copy-outline" color={color.palette.white} size={20} />
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  ))

  const RenderTopContainer = React.memo(() => (
    <>
      <View style={Style.DescriptionText}>
        <Text tx="common.method" />
        <Text>{method === "ON_CHAIN" ? "On-chain" : "Lightning"}</Text>
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

  const RenderBottomContainer = React.memo(() => (
    <>
      <View style={Style.AddressDescriptionContainer}>
        <Text tx="common.toBitcoinAddress" />
        <Button onPress={handler.SeeFullText} style={Style.AddressContainer}>
          <Text style={Style.AddressText}>
            {`${address.slice(0, 11).trim()}...${address
              .slice(address.length - 13, address.length)
              .trim()}`}
          </Text>
          <Ionicons name="eye" color={color.palette.offGray} size={20} />
        </Button>
      </View>
      <View style={Style.ButtonContainer}>
        <Button onPress={handler.Confirm} style={Style.ConfirmButton}>
          <Text style={Style.ButtonText} tx="common.confirm" />
        </Button>
        <Button onPress={handler.Confirm} style={Style.CancelButton}>
          <Text style={Style.ButtonText} tx="common.cancel" />
        </Button>
      </View>
    </>
  ))

  const handler = {
    Confirm: () => navigator.navigate("TransactionComplete", route.params),
    CopyText: () => {
      Clipboard.setString(address)
      setSnackBar(
        (content) =>
          (content = {
            ...content,
            duration: 1500,
            text: I18n.t("SNACKBAR_TEXT_COPY_TO_CLIPBOARD"),
          }),
      )
      onToggleSnackBar()
    },
    Share: async () => {
      try {
        await Share.share({
          message: address,
        })
      } catch (error) {
        alert(error.message)
      }
    },
    SeeFullText: () => setToggleModal(true),
    CloseModal: () => setToggleModal(false),
  }

  switch (method) {
    case "LIGHTNING":
    case "ON_CHAIN":
      return (
        <View testID="TransactionConfirmScreen" style={Style.Container}>
          <Screen unsafe={true} style={Style.Container}>
            <View style={Style.InnerContainer}>
              <RenderTopContainer />
              <RenderBottomContainer />
            </View>
          </Screen>
          <RenderAddressModal />
        </View>
      )
    default:
      return <></>
  }
})
