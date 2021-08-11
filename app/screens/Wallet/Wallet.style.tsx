import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const { width, height } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  BottomContainer: {
    position: "absolute",
    bottom: 95,
    backgroundColor: color.secondaryBackground,
    height: height / 1.9,
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
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
  TopContainer: {
    display: "flex",
    height: height / 3,
  },
  TopContainerStart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width / 13,
    marginTop: height / 80,
  },
  TopContainerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  TopContainerEnd: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ButtonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Button: {
    backgroundColor: color.secondaryBackground,
    width: width / 6,
    height: width / 6,
    borderRadius: 10,
    marginBottom: height / 90,
  },
  ButtonLabel: {
    fontSize: textStyle.smallSize,
    color: color.palette.offGray,
  },
})

export default Style
