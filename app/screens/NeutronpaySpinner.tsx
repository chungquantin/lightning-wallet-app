import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { AutoImage } from "../components"
import { color } from "../theme"

const NeutronpayLogo = require("../../assets/images/logos/neutronpay-logo.png")

const NeutronpaySpinner = ({ style }: Partial<{ style: StyleProp<ViewStyle> }>) => {
  return (
    <View
      style={Object.assign(
        { justifyContent: "center", height: "100%", marginTop: -50 },
        style || {},
      )}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AutoImage
            style={{
              resizeMode: "contain",
            }}
            width={100}
            height={65}
            source={NeutronpayLogo}
          />
          <ActivityIndicator
            color={color.secondaryBackground}
            size={120}
            style={{ position: "absolute" }}
          />
        </View>
      </View>
    </View>
  )
}

export default NeutronpaySpinner
