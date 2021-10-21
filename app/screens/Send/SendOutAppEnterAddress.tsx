import React from "react"
import { Clipboard, View } from "react-native"
import { Button, Text } from "../../components"
import Style from "./SendOutAppEnterAddress.style"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import useFormValidation from "../../hooks/useFormValidation"

export const SendOutAppEnterAddressScreen = observer(function SendOutAppEnterAddressScreen() {
  const { formValues, handleSetFieldValue } = useFormValidation<{
    address: string
  }>({
    address: "",
  })

  const handler = {
    PasteFromClipboard: async () => {
      const pastedText = await Clipboard.getString()
      handleSetFieldValue("address", pastedText)
    },
  }
  return (
    <View testID="SendOutAppEnterAddressScreen" style={Style.Container}>
      <View style={{ padding: 20 }}>
        <Text>Address</Text>
        <TextInput
          style={{
            color: color.palette.white,
            marginTop: 20,
          }}
          multiline={true}
          numberOfLines={5}
          autoCapitalize="none"
          placeholderTextColor={color.palette.offGray}
          onChangeText={(text) => handleSetFieldValue("address", text)}
          value={formValues.address}
          placeholder={"Enter or paste the address here"}
        />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Button
          style={{ backgroundColor: color.secondaryBackground, height: 50 }}
          onPress={handler.PasteFromClipboard}
        >
          <Text style={{ color: color.palette.green }}>Paste from clipboard</Text>
        </Button>
      </View>
      <View style={{ paddingHorizontal: 20, position: "absolute", bottom: 60, width: "100%" }}>
        <Button style={{ backgroundColor: color.primary, height: 50 }}>
          <Text>Continue</Text>
        </Button>
      </View>
    </View>
  )
})
