import React from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./SendOutAppRequest.style"
import { BarCodeScanner } from "expo-barcode-scanner"
import { color } from "../../theme"
import { Ionicons } from "@expo/vector-icons"
import { decode as lightningDecode } from "bolt11"
import { validate as bitcoinValidate } from "bitcoin-address-validation"
import I18n from "i18n-js"
import { ParamListBase } from "@react-navigation/routers"
import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/core"

interface SendOutAppUserRouteProps extends ParamListBase {
  InvoiceDetail: {
    description: string
  }
}

export const SendOutAppRequestScreen = observer(function SendOutAppRequestScreen() {
  const route = useRoute<RouteProp<SendOutAppUserRouteProps, "InvoiceDetail">>()
  const navigator = useNavigation()
  const isFocused = useIsFocused()
  const { description } = route.params
  const [hasPermission, setHasPermission] = React.useState(null)
  const [scanned, setScanned] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [isFocused])

  const handler = {
    ScanQRCode: ({ data }) => {
      try {
        setScanned(true)
        const address = data.split(":")[1] || data
        const isBitcoinAddress = bitcoinValidate(address)
        if (isBitcoinAddress) {
          // Handle bitcoin address QR code
          return navigator.navigate("TransactionAmountCreation", {
            description: description,
            action: "SEND",
            type: "OUT_APP",
            address: address,
            method: "ON_CHAIN",
          })
        }
        const lnPayReq = lightningDecode(address.toLowerCase())
        if (lnPayReq) {
          // Handle lightning address QR code
          return alert("Valid lightning address")
        }
        return alert(I18n.t("common.invalidBitcoinOrLightning"))
      } catch (error) {
        console.log("ERROR: ", error.message)
        return alert(I18n.t("common.invalidBitcoinOrLightning"))
      }
    },
    EnterAddress: () => navigator.navigate("SendOutAppEnterAddress"),
  }

  if (hasPermission === null) {
    return (
      <View testID="SendOutAppRequestScreen" style={Style.Container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View testID="SendOutAppRequestScreen" style={Style.Container}>
        <Text>No access to camera</Text>
      </View>
    )
  }
  return (
    <View testID="SendOutAppRequestScreen" style={Style.Container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handler.ScanQRCode}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={Style.SubContainer}>
        <View style={Style.SubContainerStart}>
          <Text style={Style.SubContainerHeader} tx="common.scanBitcoinOrLightning" />
          <Text style={{ marginTop: 10 }}>Description: {description}</Text>
        </View>
        <View style={Style.SubContainerMiddle}>
          <View style={Style.SubContainerMiddleSide} />
          <View style={Style.SubContainerMiddleCenter}>
            {scanned && (
              <Button style={Style.ResetButton} onPress={() => setScanned(false)}>
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="refresh-outline"
                  color={color.palette.white}
                  size={20}
                />
                <Text tx="common.scanAgain" />
              </Button>
            )}
          </View>
          <View style={Style.SubContainerMiddleSide} />
        </View>
        <View style={Style.SubContainerEnd}>
          <Button style={Style.AddressButton} onPress={handler.EnterAddress}>
            <Text style={Style.AddressButtonText} tx="common.enterAddress" />
          </Button>
        </View>
      </View>
    </View>
  )
})
