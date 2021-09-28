import { Dimensions, StyleSheet } from "react-native"
import { color } from "../theme"

const { width } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    paddingHorizontal: width / 12,
    flex: 1,
  },
})

export default Style
