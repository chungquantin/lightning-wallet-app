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
import { User } from "../../models/user/user"
import { useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"

export const ReceiveScreen = observer(function ReceiveScreen() {
  const [tab, switchTab] = React.useState<number>(0)
  const { userStore } = useStores()
  const isFocused = useIsFocused()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    method: "LIGHTNING" | "ONCHAIN"
    user: string
    description: string
    friendId: ""
    requestId: ""
  }>({
    method: "LIGHTNING",
    user: "",
    description: "",
    friendId: "",
    requestId: "",
  })

  const contactList: User[] = userStore.contacts

  React.useEffect(() => {
    userStore.fetchUserContacts("1")
  }, [isFocused])

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

  const RenderTabComponent = ({
    listData,
    fieldName,
  }: {
    listData: User[]
    fieldName: "friendId" | "requestId"
  }) => (
    <FlatList
      data={listData}
      renderItem={({ item }) => (
        <ReceiveUserItem
          user={item}
          onPressHandler={() => handleSetFieldValue(fieldName, item.id)}
          isSelected={formValues[fieldName] === item.id.toString()}
        />
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => (
        <View style={Style.RequestEmptyContainer}>
          <Text style={{ color: color.palette.offGray }} tx="common.contact.empty" />
        </View>
      )}
    />
  )

  const tabLists: {
    label: string
    component: JSX.Element
  }[] = [
    {
      label: "Friends",
      component: <RenderTabComponent fieldName="friendId" listData={contactList} />,
    },
    {
      label: "Request",
      component: <RenderTabComponent fieldName="requestId" listData={[]} />,
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
            key={index}
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
