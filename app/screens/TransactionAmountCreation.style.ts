import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 0.95,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  ButtonPlaceholder: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.palette.green,
  },
  ButtonContainer: {
    marginTop: 20,
    backgroundColor: color.palette.offBlack,
    paddingHorizontal: 20,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
})

export default Style
