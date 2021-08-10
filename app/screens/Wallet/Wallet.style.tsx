import { StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  BottomContainer: {
    position: "absolute",
    bottom: 95,
    backgroundColor: color.secondaryBackground,
    height: "50%",
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 35,
    paddingTop: 35,
  },
  BottomSubheader: {
    ...textStyle.subheader,
    textAlign: "center",
  },
  BottomHeader: {
    ...textStyle.header,
    textAlign: "center",
    marginBottom: 5,
  },
})

export default Style
