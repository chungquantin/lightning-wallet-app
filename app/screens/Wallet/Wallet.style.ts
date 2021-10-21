import { Dimensions, StyleSheet } from "react-native"
import { color, textStyle } from "../../theme"

const { width, height } = Dimensions.get("screen")

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
  },
  BottomContainer: {
    //position: "absolute",
    //bottom: 95,
    backgroundColor: color.secondaryBackground,
    height: height / 1.3,
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
  },
  BottomTransactionLabelContainer: {
    flexDirection: "row",
    fontSize: 10,
    flex: 1,
    paddingHorizontal: width / 13,
    paddingVertical: 13,
    justifyContent: "space-between",
    backgroundColor: color.secondaryBackground,
  },
  BottomTransactionLabelText: {
    color: color.palette.offGray,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: textStyle.secondaryFontBold,
  },
  BottomSubheader: {
    ...textStyle.subheader,
    textAlign: "center",
    fontSize: 12,
  },
  BottomHeader: {
    ...textStyle.header,
    fontSize: 16,
    fontFamily: textStyle.secondaryFontBold,
    textAlign: "center",
    marginBottom: 5,
  },
  TopContainer: {
    display: "flex",
    height: height / 2.8,
    marginBottom: 30,
  },
  TopContainerStart: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width / 13,
    marginTop: height / 80,
  },
  BalanceText: {
    fontSize: 40,
    fontFamily: textStyle.secondaryFontBold,
    fontWeight: "bold",
  },
  BalanceRate: {
    marginTop: 18,
    fontSize: textStyle.largeSize,
    fontFamily: textStyle.secondaryFont,
    color: color.palette.green,
  },
  TopContainerText: {
    color: color.palette.lightGray,
  },
  TopContainerCenter: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 3,
    paddingHorizontal: width / 13,
    flexDirection: "row",
  },
  TopContainerEnd: {
    flex: 2.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ButtonContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Button: {
    backgroundColor: color.secondaryBackground,
    width: width / 6,
    height: width / 6,
    borderRadius: 10,
    marginBottom: height / 90,
  },
  ButtonLabel: {
    fontSize: textStyle.smallSize,
    color: color.palette.offGray,
  },
  EmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  EmptyContainerHeader: {
    color: color.palette.offGray,
    fontSize: 40,
    marginBottom: 10,
  },
  EmptyContainerSubHeader: {
    color: color.palette.offGray,
    fontSize: 16,
    marginBottom: 100,
  },
  PaymentMethodContainer: {
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    backgroundColor: color.secondaryBackground,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  PaymentMethodHeader: { fontWeight: "bold", fontSize: 14 },
  PaymentMethodSubHeader: { marginTop: 5, fontSize: 12, color: color.palette.offGray },
})

export default Style
