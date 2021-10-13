import { StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

export const Style = StyleSheet.create({
  Container: {
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    borderBottomColor: color.borderLight,
    borderWidth: 1,
    borderTopColor: color.transparent,
    borderRightColor: color.transparent,
    borderLeftColor: color.transparent,
  },
  ItemTitle: {
    color: color.text,
    fontSize: textStyle.normalSize,
  },
  ItemDescription: {
    color: color.palette.offGray,
    fontSize: textStyle.smallSize,
    marginTop: 2,
  },
})
