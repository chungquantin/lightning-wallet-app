import React from "react"
import { Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import QRCode from "react-native-qrcode-svg"
import Style from "./SendOutAppRequest.style"
import { color } from "../../theme"

export const SendOutAppRequestScreen = observer(function SendOutAppRequestScreen() {
  const [tab, switchTab] = React.useState<number>(0)
  const [qrCodeData, setQrCodeData] = React.useState("")
  const invoice = {
    btcAddress: "bc1qdy55lyl66ueupcsf7ltfgmxw4pevlthw2hs5zfn9n9zp60nl5p4s5mel0k",
    lightningAddress:
      "lnbc1ps546rmpp523g50ajfk8r75s8l560exgjncny6dhm20cr5m9k6fepxf5ttmnmsdqqcqzzgxqrrssrzjqw8c7yfutqqy3kz8662fxutjvef7q2ujsxtt45csu0k688lkzu3ldmssuf6vz4wymcqqqqryqqqqthqqpysp50r0e04v3m9x5zrt5pwvw9w5j8uca3sldvtqmme0h5lrkyjx27ffs9qypqsqlacawfp8zc5zacxfnhll9lsrn58237q7426qmkzafc6w67dmgl2y5wjn0nu7djnv45gwg48uu6xa2ry35uwz002kkvfj8n8edkwedncq70mpf0",
    description: "Neutronpay",
    amount: 100000,
  }
  React.useEffect(() => {
    if (tab === 0) {
      // On-chain
      handler.GenerateQRCode(`${invoice.btcAddress}`)
    } else {
      // Lightning
      handler.GenerateQRCode(`${invoice.lightningAddress}`)
    }
  }, [tab])

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
  }
  const tabLists: {
    label: string
    component: JSX.Element
  }[] = [
    {
      label: "On-chain",
      component: <></>,
    },
    {
      label: "Lightning",
      component: <></>,
    },
  ]
  return (
    <View testID="SendOutAppRequestScreen" style={Style.Container}>
      <Screen unsafe={true}>
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
        {qrCodeData !== "" ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginVertical: 50,
                backgroundColor: color.secondaryBackground,
                padding: 30,
                width: Dimensions.get("screen").width - 40,
                borderRadius: 50,
                elevation: 1,
                shadowColor: color.palette.green,
                shadowOpacity: 1,
																shadowRadius: 8
              }}
            >
              <QRCode size={Dimensions.get("screen").width - 100} value={qrCodeData} />
            </View>
          </View>
        ) : (
          <></>
        )}
        <Text>{qrCodeData}</Text>
      </Screen>
    </View>
  )
})
