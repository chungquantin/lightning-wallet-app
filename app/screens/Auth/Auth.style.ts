import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
    alignItems: "center",
  },
  InputField: {
    backgroundColor: color.secondaryBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    width: Dimensions.get("screen").width / 1.3,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  InputHelperText: {
    color: color.error,
    marginTop: 6,
    fontSize: 13,
  },
  InputFieldError: {
    borderColor: color.error,
    borderWidth: 1,
    color: color.error,
  },
  Header: { fontSize: 35, fontWeight: "bold", fontFamily: textStyle.secondaryFontBold },
  SubHeader: { fontFamily: textStyle.primaryFont, color: color.palette.offGray },
  InputLabel: { fontWeight: "bold", marginBottom: 10, fontSize: 13, color: color.palette.offWhite },
  Icon: {
    marginRight: 20,
  },
  Button: {
    backgroundColor: color.primary,
    width: "100%",
    marginTop: 20,
    fontWeight: "bold",
    paddingVertical: 7,
    borderRadius: 5,
    color: color.palette.white,
  },
})

export default Style
