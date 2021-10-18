import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  InnerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  AmountText: {
    fontWeight: "bold",
    fontSize: 45,
    fontFamily: textStyle.secondaryFontBold,
  },
  DescriptionText: { alignItems: "center", justifyContent: "center", flexDirection: "row" },
  ButtonContainer: {
    paddingHorizontal: 35,
    width: Dimensions.get("screen").width,
    marginTop: Dimensions.get("screen").height / 5,
  },
  ButtonText: {
    fontWeight: "bold",
  },
  ConfirmButton: { width: "100%", height: 45, backgroundColor: color.primary },
  CancelButton: {
    width: "100%",
    height: 45,
    marginTop: 10,
    backgroundColor: color.secondaryBackground,
  },
})

export default Style
