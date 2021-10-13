import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 0.85,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  UpperContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  AmountContainer: { flexDirection: "row", alignItems: "center" },
  AmountText: {
    fontWeight: "bold",
    fontSize: 60,
    fontFamily: textStyle.secondaryFontBold,
    marginTop: 20,
  },
  ModalContainer: {
    backgroundColor: color.background,
    borderRadius: 15,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxHeight: Dimensions.get("screen").height / 2,
    alignItems: "center",
  },
  CurrencyItem: {
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("screen").width - 100,
    justifyContent: "space-between",
    height: 60,
    borderBottomWidth: 1.5,
  },
  MenuItemNormal: { color: color.palette.offGray, fontSize: 15 },
  CurrencySymbol: { fontWeight: "bold", fontSize: 35, marginRight: 5 },
  MaxAmountText: { marginTop: 10, fontFamily: textStyle.primaryFont, color: color.palette.offGray },
  ConnectPaymentMethodButton: {
    backgroundColor: color.secondaryBackground,
    height: 70,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  ConnectPaymentMethodContainer: {
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 25,
  },
  ConnectPaymentMethodHeader: { fontWeight: "bold", fontSize: 14 },
  ConnectPaymentMethodSubHeader: { color: color.palette.offGray, marginTop: 5, fontSize: 13 },
  ConnectPaymentMethodHighlight: { color: color.palette.green, fontWeight: "bold", fontSize: 13 },
})

export default Style
