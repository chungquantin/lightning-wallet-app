import React from "react"
import { Dimensions, View, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import QRCode from "react-native-qrcode-svg"
import Style from "./ReceiveOutAppRequest.style"
import { Ionicons } from "@expo/vector-icons"
import { color } from "../../theme"

const NeutronpayLogo = require("../../../assets/images/logos/neutronpay-logo.png")

export const ReceiveOutAppRequestScreen = observer(function ReceiveOutAppRequestScreen() {
  const [tab, switchTab] = React.useState<number>(0)
  const [expirationTime, setExpirationTime] = React.useState({
    minute: 60,
    second: 0,
  })
  React.useEffect(() => {
    if (tab === 1) {
      const timer = setInterval(() => {
        if (expirationTime.minute === 0) {
          // Re-create a new invoice
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
  }, [tab, expirationTime])
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
    CopyText: () => {},
    SeeFullText: () => {},
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
    <View testID="ReceiveOutAppRequestScreen" style={Style.Container}>
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
                marginVertical: 30,
                borderRadius: 20,
              }}
            >
              <QRCode
                size={Dimensions.get("screen").width - 70}
                logo={NeutronpayLogo}
                logoSize={60}
                logoBackgroundColor={color.palette.white}
                logoBorderRadius={15}
                logoMargin={5}
                value={qrCodeData}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.secondaryBackground,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 35,
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <Pressable onPress={handler.CopyText}>
            <Text style={{ color: color.palette.offWhite, marginRight: 10 }}>
              {`${qrCodeData.slice(0, 14).trim()}...${qrCodeData
                .slice(qrCodeData.length - 14, qrCodeData.length)
                .trim()}`}
            </Text>
          </Pressable>
          <Pressable onPress={handler.SeeFullText}>
            <Ionicons name="eye" color={color.palette.offGray} size={20} />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 35 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
            <Text tx="common.form.description.label" style={{ fontWeight: "bold", fontSize: 14 }} />
            <Text>{`${"Transaction from Neutronpay".slice(0, 17).trim()}...`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text
              tx="common.form.amount.label"
              style={{
                fontWeight: "bold",
                fontSize: 14,
              }}
            />
            <Button
              style={{
                backgroundColor: color.palette.offBlack,
                paddingHorizontal: 20,
                elevation: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="add" color={color.palette.green} size={15} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: color.palette.green,
                  marginLeft: 5,
                }}
                tx="common.form.amount.placeholder"
              />
            </Button>
          </View>
          {tab === 1 && (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
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
          )}
        </View>
      </Screen>
    </View>
  )
})
