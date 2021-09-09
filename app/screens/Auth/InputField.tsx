import { Ionicons } from "@expo/vector-icons"
import I18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Text } from "../../components"
import { TxKeyPath } from "../../i18n"
import { color } from "../../theme"
import Style from "./Auth.style"

interface Props {
  value: string
  onFocusHandler: () => void
  onChangeHandler: (text: string) => void
  txPlaceholder: TxKeyPath
  txLabel: TxKeyPath
  error: string
  icon: any
  style?: StyleProp<ViewStyle>
  isPassword: boolean
}

export const InputField = observer(function InputField(props: Props) {
  return (
    <View style={props.style}>
      <View
        style={Object.assign(
          {
            ...Style.InputField,
          },
          props.error ? Style.InputFieldError : {},
        )}
      >
        <View>
          <Ionicons style={Style.Icon} name={props.icon} size={15} color={color.palette.offGray} />
        </View>
        <View>
          <Text
            style={Object.assign(
              {
                ...Style.InputLabel,
              },
              props.error ? { color: color.error } : {},
            )}
            tx={props.txLabel}
          />
          <TextInput
            onFocus={props.onFocusHandler}
            secureTextEntry={props.isPassword}
            style={props.error ? { color: color.error } : { color: color.text }}
            placeholderTextColor={color.palette.offGray}
            placeholder={I18n.t(props.txPlaceholder)}
            onChangeText={props.onChangeHandler}
            value={props.value}
          />
        </View>
      </View>
      {props.error ? <Text style={Style.InputHelperText}>{props.error}</Text> : <></>}
    </View>
  )
})
