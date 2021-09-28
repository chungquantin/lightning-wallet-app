import { Dimensions, StyleSheet } from "react-native"
import { color } from "../../theme"

const { width } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    paddingHorizontal: width / 12,
    flex: 1,
  },
  Header: { fontWeight: "bold" },
  BankAccountContainer: {
    backgroundColor: color.secondaryBackground,
    borderRadius: 15,
    marginTop: 20,
  },
  BankAccountImage: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 25,
  },
  BankAccountTopContainer: {
    paddingVertical: 15,
    flexDirection: "row",
  },
  BankAccountBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.secondaryBackground,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 15,
    marginTop: 5,
  },
  Button: {
    marginTop: 20,
    backgroundColor: color.transparent,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: color.palette.offGray,
    height: 50,
    borderRadius: 10,
  },
})

export default Style
