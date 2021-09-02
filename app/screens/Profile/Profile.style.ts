import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const { width } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    paddingHorizontal: width / 12,
    flex: 1,
  },
  ProfileName: {
    fontSize: 15,
    fontFamily: textStyle.secondaryFontBold,
    color: color.palette.offWhite,
  },
  ProfileMetaContainer: { marginLeft: 15 },
  ProfileSubheader: { fontSize: 13, color: color.palette.lightGrey, marginTop: 5 },
  ProfileInfoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Style
