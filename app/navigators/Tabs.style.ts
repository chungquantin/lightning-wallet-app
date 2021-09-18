import { ViewStyle } from "react-native"
import { color } from "../theme"

const Style: { [key: string]: ViewStyle | any } = {
  Header: {
    backgroundColor: color.background,
    shadowColor: color.transparent,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    elevation: 0,
  },
  Container: {
    backgroundColor: color.palette.tintBlack,
    borderTopColor: color.palette.offGray,
    shadowOffset: {
      height: 0.5,
    },
    elevation: 2,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  TabItemsView: {
    alignItems: "center",
    justifyContent: "center",
  },
  TabItemsLabel: {
    fontSize: 10,
    marginTop: 5,
  },
  TabBarCustomButton: {
    top: -15,
    justifyContent: "center",
    alignItems: "center",
    //shadow
  },
  TabBarCustomButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  CustomHeaderRightButton: { marginRight: 20, fontSize: 22 },
}

export default Style
