import { Dimensions, StyleSheet } from "react-native"
import { color } from "../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
    flexDirection: "column",
  },
  ItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  ItemLeftText: {
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default Style
