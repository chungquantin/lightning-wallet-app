import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const width = Dimensions.get("screen").width

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  TabContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  TabButtonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  ButtonContainer: {
    marginHorizontal: width / 13,
  },
  InputLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: width / 13,
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
  BottomContainer: {
    width: "100%",
    paddingBottom: 150,
  },
  BottomTransactionLabelContainer: {
    flexDirection: "row",
    fontSize: 10,
    flex: 1,
    paddingHorizontal: width / 13,
    paddingVertical: 13,
    justifyContent: "space-between",
    backgroundColor: color.background,
  },
  BottomTransactionLabelText: {
    color: color.palette.offGray,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: textStyle.secondaryFontBold,
  },
  EmptySectionContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  EmptySectionHeader: { fontSize: 30, fontWeight: "bold" },
  EmptySectionSubHeader: { fontSize: 14 },
  EmptySectionImage: {
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 20,
  },
})

export default Style
