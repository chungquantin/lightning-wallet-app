import React from "react"
import { Dimensions, View, Clipboard, Share } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import QRCode from "react-native-qrcode-svg"
import Style from "./ReceiveOutAppRequest.style"
import { Ionicons } from "@expo/vector-icons"
import { color } from "../../theme"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useRoute } from "@react-navigation/core"
import { formatByUnit } from "../../utils/currency"
import { Portal, Modal } from "react-native-paper"
import { SnackBarContext } from "../../constants/Context"
import I18n from "i18n-js"
import { useStores } from "../../models"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"

const BitcoinIcon = require("../../../assets/images/icons/Bitcoin-Icon.png")
const LightningIcon = require("../../../assets/images/icons/Lightning-Network-Icon.png")
interface ReceiveOutAppUserRouteProps extends ParamListBase {
  InvoiceDetail: {
    description: string
    amount: number
    currency: string
  }
}

export const ReceiveOutAppRequestScreen = observer(function ReceiveOutAppRequestScreen() {
  const route = useRoute<RouteProp<ReceiveOutAppUserRouteProps, "InvoiceDetail">>()
  const { onToggleSnackBar, setSnackBar } = React.useContext(SnackBarContext)
  const { btcStore } = useStores()
  const { description, amount, currency } = route.params
  const [tab, switchTab] = React.useState<number>(0)
  const [toggleModal, setToggleModal] = React.useState(false)
  const [expirationTime, setExpirationTime] = React.useState({
    minute: 1,
    second: 0,
  })
  const [loading, setLoading] = React.useState({
    onchain: false,
    lightning: false,
  })

  const [qrCodeData, setQrCodeData] = React.useState("")
  const invoice = React.useMemo(
    () => ({
      btcAddress: btcStore.onchainAddress,
      lightningAddress: btcStore.lightningAddress,
      description: description,
      amount: amount,
    }),
    [btcStore.onchainAddress, btcStore.lightningAddress],
  )

  const tabLists: {
    label: string
  }[] = [
    {
      label: "On-chain",
    },
    {
      label: "Lightning",
    },
  ]
  React.useEffect(() => {
    const fetchData = async () => {
      if (tab === 0) {
        // Onchain
        setLoading(
          (loading) =>
            (loading = {
              ...loading,
              onchain: true,
            }),
        )
        const generateOnchainAddress = await btcStore.generateOnchainAddress()
        if (generateOnchainAddress.success) {
          setLoading(
            (loading) =>
              (loading = {
                ...loading,
                onchain: false,
              }),
          )
        }
      } else if (tab === 1) {
        // Lightning
        setLoading(
          (loading) =>
            (loading = {
              ...loading,
              lightning: true,
            }),
        )
        const generateOnchainAddress = await btcStore.generateLightningAddress({
          amount,
          currency,
          description,
        })
        if (generateOnchainAddress.success) {
          setLoading(
            (loading) =>
              (loading = {
                ...loading,
                lightning: false,
              }),
          )
        }
      }
    }
    fetchData()
  }, [tab])
  React.useEffect(() => {
    if (!loading.lightning) {
      const timer = setInterval(() => {
        if (expirationTime.minute === 0 && expirationTime.second === 0) {
          // Re-create a new invoice
          return
        }
        if (expirationTime.second > 0) {
          setExpirationTime({
            ...expirationTime,
            second: expirationTime.second - 1,
          })
        } else {
          setExpirationTime({
            minute: expirationTime.minute - 1,
            second: 59,
          })
        }
      }, 1000)
      return () => clearInterval(timer)
    }
    return () => {}
  }, [expirationTime])
  React.useEffect(() => {
    if (tab === 0 && invoice.btcAddress) {
      // On-chain
      handler.GenerateQRCode(`${invoice.btcAddress}`)
    } else if (tab === 1 && invoice.lightningAddress) {
      // Lightning
      handler.GenerateQRCode(`${invoice.lightningAddress}`)
    }
  }, [tab])

  const RenderTabContainer = React.memo(() => (
    <View style={Style.RequestTabContainer}>
      {tabLists.map((tabItem, index) => (
        <Button
          key={index}
          style={{
            ...Style.RequestTabButton,
            ...(tab === index ? Style.RequestTabButtonActive : Style.RequestTabButtonInActive),
          }}
          onPress={() => handler.SwitchTab(index)}
        >
          <Text>{tabItem.label}</Text>
        </Button>
      ))}
    </View>
  ))
  const RenderQRContainer = React.memo(() => (
    <>
      {qrCodeData !== "" || (!loading.lightning && tab === 1) || (!loading.onchain && tab === 0) ? (
        <>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginVertical: 30,
                borderRadius: 20,
              }}
            >
              <QRCode
                size={Dimensions.get("screen").width - 70}
                //logo={NeutronpayLogo}
                logoSize={60}
                //logoBackgroundColor={color.palette.white}
                logoBorderRadius={15}
                logoMargin={5}
                value={qrCodeData || "1"}
              />
            </View>
          </View>
          <Button onPress={handler.SeeFullText} style={Style.AddressContainer}>
            <Text style={Style.AddressText}>
              {`${qrCodeData.slice(0, 14).trim()}...${qrCodeData
                .slice(qrCodeData.length - 14, qrCodeData.length)
                .trim()}`}
            </Text>
            <Ionicons name="eye" color={color.palette.offGray} size={20} />
          </Button>
        </>
      ) : (
        <View style={{ height: 500 }}>
          <NeutronpaySpinner
            image={tab === 0 ? BitcoinIcon : LightningIcon}
            style={{ marginTop: 0 }}
          />
        </View>
      )}
    </>
  ))
  const RenderMetaListContainer = React.memo(() => (
    <View style={{ paddingHorizontal: 35 }}>
      <View style={Style.ListItemContainer}>
        <Text tx="common.form.description.label" style={{ fontWeight: "bold", fontSize: 14 }} />
        <Text>
          {invoice.description.length > 17
            ? `${invoice.description.slice(0, 17).trim()}...`
            : invoice.description}
        </Text>
      </View>
      <View style={Style.ListItemContainer}>
        <Text
          tx="common.form.amount.label"
          style={{
            fontWeight: "bold",
            fontSize: 14,
          }}
        />
        <Text style={Style.ButtonPlaceholder}>{formatByUnit(amount, currency)}</Text>
      </View>
      {tab === 1 && (
        <View>
          <View style={Style.ListItemContainer}>
            <Text
              tx="common.form.expirationTime.label"
              style={{ fontWeight: "bold", fontSize: 14 }}
            />
            <Text>
              {`${
                expirationTime.minute >= 10 ? expirationTime.minute : `0${expirationTime.minute}`
              }:${
                expirationTime.second >= 10 ? expirationTime.second : `0${expirationTime.second}`
              }`}
            </Text>
          </View>
        </View>
      )}
    </View>
  ))
  const RenderAddressModal = React.memo(() => (
    <Portal>
      <Modal
        visible={toggleModal}
        onDismiss={handler.CloseModal}
        contentContainerStyle={{ paddingHorizontal: 30 }}
      >
        <View style={Style.ModalContainer}>
          <Text
            tx={tab === 1 ? "common.lightning.address" : "common.onchain.address"}
            style={{ fontWeight: "bold", marginBottom: 20, fontSize: 18, marginTop: 15 }}
          />
          <Text style={Style.ModalContentText} selectable={true}>
            {tab === 1 ? invoice.lightningAddress : invoice.btcAddress}
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

  const handler = {
    SwitchTab: (index) => {
      if (tab !== index) {
        switchTab(index)
      }
    },
    GenerateQRCode: async (data: string) => {
      let qrData = data

      if (data.startsWith("bitcoin:")) {
        const label = encodeURI(`${invoice.description} for ${invoice.amount} VND`)
        qrData += `?label=${label}`
      }
      setQrCodeData(qrData)
    },
    CopyText: () => {
      Clipboard.setString(tab === 1 ? invoice.lightningAddress : invoice.btcAddress)
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
        const result = await Share.share({
          message: tab === 1 ? invoice.lightningAddress : invoice.btcAddress,
        })
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message)
      }
    },
    SeeFullText: () => setToggleModal(true),
    CloseModal: () => setToggleModal(false),
  }

  return (
    <View testID="ReceiveOutAppRequestScreen" style={Style.Container}>
      <Screen unsafe={true} preset="scroll">
        <RenderTabContainer />
        <RenderQRContainer />
        {qrCodeData !== "" ||
          (!loading.lightning && tab === 1) ||
          (!loading.onchain && tab === 0 && <RenderMetaListContainer />)}
        <RenderAddressModal />
      </Screen>
    </View>
  )
})
