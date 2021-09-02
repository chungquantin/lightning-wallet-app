import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./Send.style"
import useFormValidation from "../../hooks/useFormValidation"
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color } from "../../theme"
import { UserItem } from "../UserItem"
import { User } from "../../models/user/user"
<<<<<<< HEAD
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
=======
import { useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import useCustomNavigation from "../../hooks/useCustomNavigation"
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637

export const SendScreen = observer(function SendScreen() {
  const [tab, switchTab] = React.useState<number>(0)
  const { userStore } = useStores()
  const isFocused = useIsFocused()
<<<<<<< HEAD
  const navigator = useNavigation()
=======
  const navigator = useCustomNavigation()
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637
  const { formValues, handleSetFieldValue } = useFormValidation<{
    user: string
    description: string
  }>({
    user: "",
    description: "",
  })

  const [contactList, setContactList] = React.useState<User[]>(userStore.contacts)

  const handler = {
    OutAppRequest: () => navigator.navigate("SendOutAppRequest"),
    InAppRequest: (user: User) => {
<<<<<<< HEAD
      navigator.navigate("SendInAppRequest", {
=======
      navigator.navigate<{
        user: User
      }>("SendInAppRequest", {
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637
        user,
      })
    },
  }

  React.useEffect(() => {
    userStore.fetchUserContacts("1")
  }, [isFocused])

  React.useEffect(() => {
    if (formValues.user !== "") {
      const filteredContactList = userStore.getContactsByNameAndEmail(formValues.user)
      setContactList((list) => (list = filteredContactList))
    } else {
      setContactList(userStore.contacts)
    }
  }, [formValues.user])

  const RenderTabComponent = ({ listData }: { listData: User[] }) => (
    <FlatList
      data={listData}
      renderItem={({ item }) => (
        <UserItem user={item} onPressHandler={() => handler.InAppRequest(item)} />
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
      label: I18n.t("common.friends"),
      component: <RenderTabComponent listData={contactList} />,
    },
    {
      label: I18n.t("common.pay"),
      component: <RenderTabComponent listData={[]} />,
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
    <View testID="SendScreen" style={Style.Container}>
      <View>
        <TouchableOpacity style={Style.ScanButton} onPress={handler.OutAppRequest}>
          <LinearGradient
            colors={[color.palette.purple, color.palette.darkPurple]}
            style={Style.ScanButtonInner}
          >
            <Ionicons name="scan-outline" color={color.palette.offWhite} size={25} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={Style.InputContainer}>
        <View style={Style.Input}>
          <Text tx="common.form.to.label" style={Style.InputLabel} />
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
