import React from "react"
import { Image, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./Receive.style"
import useFormValidation from "../../hooks/useFormValidation"
import { FlatList, TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color } from "../../theme"
import { ReceiveUserItem } from "./ReceiveUserItem"

export const ReceiveScreen = observer(function ReceiveScreen() {
  const { formValues, handleSetFieldValue } = useFormValidation<{
    method: "LIGHTNING" | "ONCHAIN"
    user: string
    description: string
  }>({
    method: "LIGHTNING",
    user: "",
    description: "",
  })

  const [tab, switchTab] = React.useState<number>(0)

  const RenderMethodContainer = () => (
    <View style={Style.MethodContainer}>
      <Button
        style={{
          ...Style.MethodButton,
          ...(formValues.method === "LIGHTNING" ? Style.MethodActive : Style.MethodInactive),
        }}
        onPress={() => handleSetFieldValue("method", "LIGHTNING")}
      >
        <Image
          source={require("../../../assets/images/icons/Bitcoin-Icon.png")}
          style={Style.MethodIcon}
        />
        <View>
          <Text style={Style.MethodHeader}>On-chain</Text>
          <Text style={Style.MethodSubheader} tx="common.onchain.description" />
        </View>
      </Button>
      <Button
        style={{
          ...Style.MethodButton,
          ...(formValues.method === "ONCHAIN" ? Style.MethodActive : Style.MethodInactive),
        }}
        onPress={() => handleSetFieldValue("method", "ONCHAIN")}
      >
        <Image
          source={require("../../../assets/images/icons/Lightning-Network-Icon.png")}
          style={Style.MethodIcon}
        />
        <View>
          <Text style={Style.MethodHeader}>Lightning</Text>
          <Text style={Style.MethodSubheader} tx="common.lightning.description" />
        </View>
      </Button>
    </View>
  )

  const tabLists: {
    label: string
    component: JSX.Element
  }[] = [
    {
      label: "Friends",
      component: (
        <FlatList
          data={[
            {
              id: "123",
              name: "Tin",
              email: "cqtin0903@gmail.com",
            },
          ]}
          renderItem={({ item }) => <ReceiveUserItem />}
          keyExtractor={(item) => item.id}
        />
      ),
    },
    {
      label: "Request",
      component: <></>,
    },
  ]

  const RenderTabContainer = () => {
    const handleSwitchTab = (index) => {
      if (tab !== index) {
        switchTab(index)
      }
    }
    return (
      <View style={Style.RequestTabContainer}>
        {tabLists.map((tabItem, index) => (
          <Button
            style={{
              ...Style.RequestTabButton,
              ...(tab === index ? Style.RequestTabButtonActive : Style.RequestTabButtonInActive),
            }}
            onPress={() => handleSwitchTab(index)}
          >
            <Text>{tabItem.label}</Text>
          </Button>
        ))}
      </View>
    )
  }

  return (
    <View testID="ReceiveScreen" style={Style.Container}>
      <RenderMethodContainer />
      <View style={Style.InputContainer}>
        <View style={Style.Input}>
          <Text tx="common.form.from.label" style={Style.InputLabel} />
          <TextInput
            style={Style.InputField}
            placeholderTextColor={color.palette.offGray}
            placeholder={I18n.t("common.form.from.placeholder")}
            onChangeText={(text) => handleSetFieldValue("user", text)}
            value={formValues.user}
          />
        </View>
        <View style={Style.Input}>
          <Text tx="common.form.description.label" style={Style.InputLabel} />
          <TextInput
            style={Style.InputField}
            placeholderTextColor={color.palette.offGray}
            placeholder={I18n.t("common.form.description.placeholder")}
            onChangeText={(text) => handleSetFieldValue("description", text)}
            value={formValues.description}
          />
        </View>
      </View>
      <View style={Style.RequestContainer}>
        <RenderTabContainer />
        {tabLists[tab].component}
      </View>
    </View>
  )
})
