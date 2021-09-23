import { StyleSheet } from "react-native"
import { color } from "../theme"

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
  },
  ButtonContainer: {
    backgroundColor: color.transparent,
    flexDirection: "row",
    width: "100%",
  },
  CalculatorButton: {
    backgroundColor: color.secondaryBackground,
    margin: 5,
    width: 50,
    height: 60,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  CalculatorButtonText: {
    fontWeight: "bold",
  },
  SubmitButton: {
    backgroundColor: color.primary,
    marginHorizontal: 5,
    height: 40,
    marginVertical: 10,
  },
})

export default Style
