import { StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  InputField: {
    paddingVertical: 8,
    flex: 1,
    color: color.text,
  },
  SearchIcon: {
    marginRight: 15,
    paddingVertical: 8,
  },
  SearchContainer: {
    backgroundColor: color.secondaryBackground,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row",
  },
})

export default Style
