import { StyleSheet } from "react-native"
import { color } from "../../theme"

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
  UpperContainer: { marginBottom: 40, justifyContent: "center", alignItems: "center" },
  ImageContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 30 },
  SubHeaderText: { color: color.palette.offGray, marginBottom: 10 },
  CurrencySymbol: {
    fontSize: 30,
    marginTop: 5,
    fontWeight: "bold",
  },
  Amount: {
    fontSize: 45,
    fontWeight: "bold",
  },
  Separator: {
    marginVertical: 10,
    backgroundColor: color.palette.offGray,
    width: "100%",
    height: 1,
  },
  BalanceText: { fontWeight: "bold", color: color.palette.green },
  CancelButton: { width: "100%", flex: 1, backgroundColor: color.primaryDarker, height: 40 },
  SubmitButton: { width: "100%", flex: 1, backgroundColor: color.primary, height: 40 },
  ButtonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    marginHorizontal: 15,
  },
})

export default Style
