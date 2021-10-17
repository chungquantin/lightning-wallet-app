import { StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  RowItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 15,
  },
  ContactInfoInner: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: color.secondaryBackground,
    width: "100%",
    borderRadius: 15,
  },
  ContactInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 100,
  },
})

export default Style
