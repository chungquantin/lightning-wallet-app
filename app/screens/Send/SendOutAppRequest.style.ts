import { StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  RequestTabContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  RequestTabButton: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 3,
  },
  RequestTabButtonActive: {
    backgroundColor: color.primary,
  },
  RequestTabButtonInActive: {
    backgroundColor: color.palette.darkPurple,
  },
})

export default Style
