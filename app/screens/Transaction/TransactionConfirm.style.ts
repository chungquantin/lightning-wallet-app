import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  InnerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  AmountText: {
    fontWeight: "bold",
    fontSize: 45,
    fontFamily: textStyle.secondaryFontBold,
  },
  DescriptionText: { alignItems: "center", justifyContent: "center", flexDirection: "row" },
  AddressDescriptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").height / 5,
  },
  AddressContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondaryBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  AddressText: { color: color.palette.offWhite, marginRight: 10 },
  ModalContainer: {
    backgroundColor: color.background,
    maxHeight: Dimensions.get("screen").height / 2,
    borderRadius: 15,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ModalContentText: {
    color: color.palette.offWhite,
  },
  ModalButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  ModalButtonText: {
    marginRight: 10,
  },
  ModalButton: {
    backgroundColor: color.primary,
    flexDirection: "row",
    paddingVertical: 10,
    flex: 1,
  },
  ButtonContainer: {
    paddingHorizontal: 35,
    width: Dimensions.get("screen").width,
    marginTop: 20,
  },
  ButtonText: {
    fontWeight: "bold",
  },
  ConfirmButton: { width: "100%", height: 45, backgroundColor: color.primary },
  CancelButton: {
    width: "100%",
    height: 45,
    marginTop: 10,
    backgroundColor: color.secondaryBackground,
  },
})

export default Style
