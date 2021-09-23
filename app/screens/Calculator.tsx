import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../components"
import Style from "./Calculator.style"
import { color } from "../theme/color"

export const Calculator = observer(function Calculator({
  onChangeEvent,
  onSubmitEvent,
  formValues,
  submitButtonDisabled,
}: {
  onChangeEvent: (name: string, value: number) => void
  onSubmitEvent: () => void
  formValues: {
    amount: number
    currency: string
  }
  submitButtonDisabled: boolean
}) {
  const [isDecimal, setIsDecimal] = React.useState(false)
  const [decimal, setDecimal] = React.useState("")
  const calculatorButtons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [".", 0, "<"],
  ].map((buttons) =>
    buttons.map((button) => ({
      key: button.toString(),
      value: button,
      onPressHandler: () => {
        switch (button) {
          case "<":
            if (isDecimal) {
              if (decimal.length === 0) {
                return setDecimal("")
              }
              return setDecimal(decimal.slice(0, decimal.length - 1))
            }
            if (formValues.amount < 10) {
              return onChangeEvent("amount", 0)
            }
            return onChangeEvent(
              "amount",
              parseInt(`${formValues.amount}`.slice(0, `${formValues.amount}`.length - 1)),
            )
          case ".":
            if (!isDecimal && formValues.currency !== "VND") {
              return setIsDecimal(true)
            }
            break
          default:
            if (typeof button === "number") {
              if (isDecimal) {
                if (decimal.length < 2) {
                  return setDecimal(`${decimal}${button}`)
                }
                return
              }
              return onChangeEvent("amount", parseInt(`${formValues.amount}${button}`))
            }
        }
      },
    })),
  )
  React.useEffect(() => {
    console.log(formValues.amount, decimal, decimal.length)
    if (decimal.length > 0) {
      if (decimal.length > 1) {
        onChangeEvent(
          "amount",
          parseFloat(`${formValues.amount}${decimal.slice(decimal.length - 1)}`),
        )
      } else {
        onChangeEvent(
          "amount",
          parseFloat(`${formValues.amount.toString().split(".")[0]}.${decimal}0`),
        )
      }
    } else {
      setIsDecimal(false)
      onChangeEvent("amount", parseInt(`${formValues.amount}.00`))
    }
  }, [decimal])
  return (
    <View style={Style.Container}>
      {calculatorButtons.map((row, index) => (
        <View key={index} testID="Calculator" style={Style.ButtonContainer}>
          {row.map((button) => (
            <Button onPress={button.onPressHandler} style={Style.CalculatorButton} key={button.key}>
              <Text style={Style.CalculatorButtonText}>{button.value}</Text>
            </Button>
          ))}
        </View>
      ))}
      <Button
        textStyle={{ fontSize: 15 }}
        disabled={submitButtonDisabled}
        onPress={onSubmitEvent}
        style={Object.assign(
          { ...Style.SubmitButton },
          submitButtonDisabled ? { backgroundColor: color.palette.darkPurple } : {},
        )}
        tx="common.next"
      />
    </View>
  )
})
