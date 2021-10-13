import React from "react"
import { View, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text, AutoImage, Button } from "../../components"
import Style from "./Contact.style"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { UserItem } from "../UserItem"
import { SectionList } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color, textStyle } from "../../theme"
import useFormValidation from "../../hooks/useFormValidation"
import { Ionicons } from "@expo/vector-icons"
import { User } from "../../models/user/user"
import NeutronpaySpinner from "../NeutronpaySpinner"

const NoContactIcon = require("../../../assets/images/icons/No-Contact-Icon.png")

export const ContactScreen = observer(function ContactScreen() {
  const [loading, setLoading] = React.useState(false)
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
    const fetchData = async () => {
      setLoading(true)
      const fetchUserContactsResponse = await userStore.fetchUserContacts()
      if (fetchUserContactsResponse.success) {
        setLoading(false)
      }
    }
    fetchData()
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
    AddNewContact: () => navigator.navigate("ContactCreation"),
  }

  const RenderEmptySection = () => (
    <View style={Style.EmptySectionContainer}>
      <Text style={Style.EmptySectionHeader}>Oops!</Text>
      <AutoImage
        style={Style.EmptySectionImage}
        width={Dimensions.get("screen").width}
        height={130}
        source={NoContactIcon}
        defaultSource={NoContactIcon}
      />
      <Text
        style={{
          ...textStyle.subheader,
        }}
        tx="common.empty.contact"
      />
      <Button style={Style.EmptySectionButton} onPress={handler.AddNewContact}>
        <Text tx="contact.add-new-contact" style={Style.EmptySectionSubHeader} />
      </Button>
    </View>
  )

  const RenderContactList = () => (
    <View>
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
    </View>
  )

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
    <View testID="ContactScreen" style={Style.Container}>
      <RenderSearchContainer />
      {loading ? (
        <NeutronpaySpinner />
      ) : (
        <>{userStore.contacts.length === 0 ? <RenderEmptySection /> : <RenderContactList />}</>
      )}
    </View>
  )
})
