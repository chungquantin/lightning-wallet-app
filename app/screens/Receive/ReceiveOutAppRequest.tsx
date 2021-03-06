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
  // const { onToggleSnackBar, setSnackBar } = React.useContext(SnackBarContext)
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
    btcStore.reset()
  }, [])
  React.useEffect(() => {
    const fetchData = async () => {
      if (btcStore.lightningAddress && btcStore.onchainAddress) {
        return
      }
      if (tab === 0) {
        handler.OnchainGenerate()
      } else if (tab === 1) {
        handler.LightningGenerate()
      }
    }
    fetchData()
  }, [tab])
  React.useEffect(() => {
    if (!loading.lightning && invoice.lightningAddress) {
      const timer = setInterval(() => {
        if (expirationTime.minute === 0 && expirationTime.second === 0) {
          // Re-create a new invoice
          setExpirationTime({
            minute: 1,
            second: 0,
          })
          btcStore.clearLightningAddress()
          handler.LightningGenerate()
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
  }, [expirationTime, loading.lightning, invoice.lightningAddress])

  const lightningCondition = !loading.lightning && invoice.lightningAddress && tab === 1
  const onchainCondition = !loading.onchain && invoice.btcAddress && tab === 0
  const qrCodeData = tab === 0 ? invoice.btcAddress : invoice.lightningAddress

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
      {lightningCondition || onchainCondition ? (
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
                value={qrCodeData}
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
    OnchainGenerate: async () => {
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
    },
    LightningGenerate: async () => {
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
    },
    SwitchTab: (index) => {
      if (tab !== index) {
        switchTab(index)
      }
    },
    CopyText: () => {
      Clipboard.setString(tab === 1 ? invoice.lightningAddress : invoice.btcAddress)
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
        {lightningCondition || onchainCondition ? <RenderMetaListContainer /> : <></>}
        <RenderAddressModal />
      </Screen>
    </View>
  )
})
