import { Dimensions, StyleSheet } from "react-native"
import { color } from "../../theme"

const { width, height } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 10,
  },
  InputContainer: {
    paddingHorizontal: width / 13,
    marginTop: 5,
  },
  InputLabel: { marginTop: 15 },
  Input: {},
  InputField: {
    height: 40,
    color: color.palette.offWhite,
    borderLeftColor: color.transparent,
    borderRightColor: color.transparent,
    borderBottomColor: color.borderLight,
    borderTopColor: color.transparent,
    borderWidth: 1,
    marginBottom: 10,
  },
  RequestContainer: {
    borderColor: color.borderLight,
    borderWidth: 1,
    backgroundColor: color.secondaryBackground,
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 20,
    marginHorizontal: width / 13,
  },
  RequestEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 3,
    flex: 1,
  },
  RequestTabContainer: {
    flexDirection: "row",
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
