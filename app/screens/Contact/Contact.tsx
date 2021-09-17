import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../../components"
import Style from "./Contact.style"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { UserItem } from "../UserItem"
import { SectionList } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color } from "../../theme"
import useFormValidation from "../../hooks/useFormValidation"
import { Ionicons } from "@expo/vector-icons"
import { User } from "../../models/user/user"

export const ContactScreen = observer(function ContactScreen() {
  const { userStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    user: string
  }>({
    user: "",
  })

  const [groupContactsByAlphabet, setContactList] = React.useState(
    userStore.groupContactsByAlphabet,
  )

  React.useEffect(() => {
    userStore.fetchUserContacts()
  }, [isFocused])

  React.useEffect(() => {
    if (formValues.user !== "") {
      const filteredContactList = userStore.getGroupedContactListByNameAndEmail(formValues.user)
      setContactList((list) => (list = filteredContactList))
    } else {
      setContactList(userStore.groupContactsByAlphabet)
    }
  }, [formValues.user])

  const handler = {
    OpenUserDetail: (user: User) =>
      navigator.navigate("UserDetail", {
        user,
      }),
  }

  return (
    <View testID="ContactScreen" style={Style.Container}>
      <View style={Style.SearchContainer}>
        <Ionicons
          style={Style.SearchIcon}
          name="search"
          size={15}
          color={color.palette.lightGray}
        />
        <TextInput
          style={Style.InputField}
          placeholderTextColor={color.palette.offGray}
          placeholder={I18n.t("common.form.from.placeholder")}
          onChangeText={(text) => handleSetFieldValue("user", text)}
          value={formValues.user}
        />
      </View>
      <View>
        {userStore.contacts.length === 0 ? (
          <Text>No contact</Text>
        ) : (
          <SectionList
            sections={groupContactsByAlphabet}
            renderSectionHeader={({ section: { letter } }) => (
              <View>
                <Text style={Style.AlphabetLetter}>{letter}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <UserItem
                style={{
                  marginBottom: 5,
                }}
                user={item}
                onPressHandler={() => handler.OpenUserDetail(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  )
})
