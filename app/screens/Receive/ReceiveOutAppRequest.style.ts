import { Dimensions, StyleSheet } from "react-native"
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
    paddingHorizontal: 35,
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
  AddressContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondaryBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 35,
    borderRadius: 5,
    flexDirection: "row",
  },
  AddressText: { color: color.palette.offWhite, marginRight: 10 },
  ListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center",
  },
  ButtonPlaceholder: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.palette.green,
    marginLeft: 5,
  },
  ButtonContainer: {
    backgroundColor: color.palette.offBlack,
    paddingHorizontal: 20,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
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
})

export default Style
