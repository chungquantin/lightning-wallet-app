import { StyleSheet } from "react-native"
import { color } from "../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  DetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginVertical: 22,
  },
  DetailLabelLeft: {
    fontWeight: "bold",
  },
  DetailLabelRight: {},
})

export default Style
