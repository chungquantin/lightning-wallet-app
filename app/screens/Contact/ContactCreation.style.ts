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
