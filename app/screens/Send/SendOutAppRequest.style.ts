import { StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  SubContainer: {
    position: "absolute",
    zIndex: 50,
    width: "100%",
    height: "100%",
  },
  SubContainerStart: {
    flex: 0.5,
    backgroundColor: color.palette.blackOpacity,
    alignItems: "center",
    justifyContent: "center",
  },
  SubContainerMiddle: {
    flex: 1,
    flexDirection: "row",
  },
  SubContainerEnd: {
    flex: 0.7,
    backgroundColor: color.palette.blackOpacity,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  SubContainerMiddleSide: {
    flex: 0.1,
    backgroundColor: color.palette.blackOpacity,
  },
  SubContainerMiddleCenter: {
    flex: 1,
    backgroundColor: color.transparent,
    alignItems: "center",
    justifyContent: "center",
  },
  SubContainerHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ResetButton: { backgroundColor: color.primary, flexDirection: "row" },
  AddressButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: color.secondaryBackground,
  },
  AddressButtonText: {
    fontWeight: "bold",
  },
})

export default Style
