import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import Style from "./ContactCreation.style"
import { Ionicons } from "@expo/vector-icons"
import { TextInput } from "react-native-gesture-handler"
import { color } from "../../theme"
import I18n from "i18n-js"
import useFormValidation from "../../hooks/useFormValidation"

export const ContactCreationScreen = observer(function ContactCreationScreen() {
  const { formValues, handleSetFieldValue } = useFormValidation<{
    user: string
  }>({
    user: "",
  })
  const RenderSearchContainer = React.memo(() => (
    <View style={Style.SearchContainer}>
      <Ionicons style={Style.SearchIcon} name="search" size={15} color={color.palette.lightGray} />
      <TextInput
        style={Style.InputField}
        placeholderTextColor={color.palette.offGray}
        placeholder={I18n.t("common.form.from.placeholder")}
        onChangeText={(text) => handleSetFieldValue("user", text)}
        value={formValues.user}
      />
    </View>
  ))
  return (
    <View testID="ContactCreationScreen" style={Style.Container}>
      <Screen preset="fixed">
        <RenderSearchContainer />
        <Text>ContactCreation Screen</Text>
      </Screen>
    </View>
  )
})
