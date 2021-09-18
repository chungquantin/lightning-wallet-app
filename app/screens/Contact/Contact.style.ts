import { Dimensions, StyleSheet } from "react-native"
import { color } from "../../theme"

const Style = StyleSheet.create({
  Container: {
    backgroundColor: color.background,
    flex: 1,
    paddingBottom: 175,
  },
  AlphabetLetter: {
    color: color.palette.offGray,
    backgroundColor: color.background,
    paddingVertical: 5,
    paddingHorizontal: 18,
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
  EmptySectionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  EmptySectionButton: {
    backgroundColor: color.primary,
    width: Dimensions.get("screen").width / 2,
    height: 40,
    marginTop: 20,
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
