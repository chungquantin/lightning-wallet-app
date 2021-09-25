import { StyleSheet } from "react-native"
import { color, textStyle } from "../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  AmountText: {
    fontWeight: "bold",
    fontSize: 45,
    fontFamily: textStyle.secondaryFontBold,
  },
  DescriptionText: { alignItems: "center", justifyContent: "center", flexDirection: "row" },
  InnerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Style
