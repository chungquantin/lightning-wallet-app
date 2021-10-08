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
  PaymentMethodButton: {
    backgroundColor: color.secondaryBackground,
    height: 70,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom: 20,
  },
  PaymentMethodContainer: {
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 25,
  },
  PaymentMethodHeader: { fontWeight: "bold", fontSize: 14 },
  PaymentMethodSubHeader: { color: color.palette.offGray, marginTop: 5, fontSize: 13 },
  PaymentMethodHighlight: { color: color.palette.green, fontWeight: "bold", fontSize: 15 },
})

export default Style
