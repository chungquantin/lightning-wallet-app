import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../theme"

const { width, height } = Dimensions.get("screen")

export const Style = StyleSheet.create({
  Container: {
    paddingHorizontal: width / 13,
    backgroundColor: color.transparent,
    marginTop: height / 55,
    paddingBottom: height / 55,
    flex: 1,
    flexDirection: "row",
    borderBottomColor: color.borderLight,
    borderBottomWidth: 1,
  },
  MiddleContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  Header: {
    fontSize: textStyle.normalSize,
    marginBottom: 3,
    color: color.text,
    fontFamily: textStyle.secondaryFont,
  },
  Subheader: {
    fontSize: textStyle.smallSize,
    color: color.palette.offGray,
    fontFamily: textStyle.secondaryFont,
  },
  TransactionAmount: {
    fontSize: textStyle.normalSize,
    fontWeight: "bold",
    fontFamily: textStyle.secondaryFontBold,
  },
})
