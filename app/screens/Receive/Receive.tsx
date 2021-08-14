import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./Receive.style"
import useFormValidation from "../../hooks/useFormValidation"
import { FlatList, TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color } from "../../theme"
import { ReceiveUserItem } from "../UserItem"
import { User } from "../../models/user/user"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export const ReceiveScreen = observer(function ReceiveScreen() {
  const [tab, switchTab] = React.useState<number>(0)
  const { userStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    user: string
    description: string
    friendId: ""
    requestId: ""
  }>({
    user: "",
    description: "",
    friendId: "",
    requestId: "",
  })

  const contactList: User[] = userStore.contacts

  const handler = {
    Receive: () => navigator.navigate("ReceiveScanner"),
    InAppRequest: ({ id }: Pick<User, "id">) => {
      navigator.navigate("ReceiveInAppUser", {
        userId: id,
      })
    },
  }

  React.useEffect(() => {
    userStore.fetchUserContacts("1")
  }, [isFocused])

  const RenderMethodContainer = () => (
    <View style={Style.MethodContainer}>
      <Button
        style={{
          ...Style.MethodButton,
          ...Style.MethodActive,
        }}
        onPress={handler.Receive}
      >
        <View
          style={{
            marginRight: 20,
            borderColor: color.text,
            borderWidth: 1,
            padding: 6,
            borderRadius: 20,
          }}
        >
          <MaterialCommunityIcons size={20} color={color.text} name="arrow-expand-down" />
        </View>

        <View>
          <Text style={Style.MethodHeader} tx="common.receive" />
          <Text style={Style.MethodSubheader} tx="common.receive-description" />
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
          onPressHandler={() =>
            handler.InAppRequest({
              id: item.id,
            })
          }
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
