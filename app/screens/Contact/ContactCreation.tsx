import React from "react"
import { Alert, Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./ContactCreation.style"
import { Ionicons } from "@expo/vector-icons"
import { TextInput } from "react-native-gesture-handler"
import { color } from "../../theme"
import I18n from "i18n-js"
import useFormValidation from "../../hooks/useFormValidation"
import { validationUtil } from "../../utils"
import { UserResolverAPI } from "../../services/resolvers"
import { UserSchema } from "../../generated/graphql"
import NeutronpaySpinner from "../Reusable/NeutronpaySpinner"
import { ActivityIndicator, Avatar } from "react-native-paper"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"

export const ContactCreationScreen = observer(function ContactCreationScreen() {
  const [loading, setLoading] = React.useState(false)
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const navigator = useNavigation()
  const { userStore } = useStores()
  const [contact, setContact] = React.useState<UserSchema>(null)
  const { formValues, handleSetFieldValue } = useFormValidation<{
    searchInput: string
  }>({
    searchInput: "",
  })

  React.useEffect(() => {
    const fetchContact = async () => {
      if (
        formValues.searchInput !== contact?.username &&
        formValues.searchInput !== contact?.email &&
        !buttonLoading &&
        validationUtil.username(formValues.searchInput)
      ) {
        setLoading(true)
        const searchUserResponse = await new UserResolverAPI().searchUser(formValues.searchInput)
        if (searchUserResponse.success) {
          if (searchUserResponse.data.id !== userStore.currentUser.id) {
            setContact(searchUserResponse.data)
          } else {
            setContact(null)
          }
        } else {
          setContact(null)
        }
        setLoading(false)
      }
    }
    fetchContact()
  }, [formValues.searchInput])

  const RenderEmptyContainer = React.memo(() => (
    <View style={Style.EmptyContainer}>
      <Text style={Style.EmptyContainerHeader}>ಠ_ಠ</Text>
      <Text style={Style.EmptyContainerSubHeader} tx="common.empty.searchContact" />
    </View>
  ))
  const RenderContactItem = React.memo(() => (
    <View style={Style.ContactInfoContainer}>
      <View style={Style.ContactInfoInner}>
        <Avatar.Image
          source={{
            uri: contact.avatar || "https://pbs.twimg.com/media/EbNX_erVcAUlwIx.jpg:large",
          }}
          size={Dimensions.get("screen").height / 5}
          style={{
            marginBottom: 20,
            marginTop: -100,
          }}
        />
        <View></View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }} tx="common.form.username.label" />
          <Text>{contact.username}</Text>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }} tx="common.form.email.label" />
          <Text>{contact.email}</Text>
        </View>
        <View style={Style.RowItemContainer}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{contact.firstName} </Text>
            <Text>{contact.lastName}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            width: "100%",
            paddingHorizontal: 25,
          }}
        >
          <Button
            style={{
              backgroundColor: color.primary,
              height: 40,
            }}
            disabled={buttonLoading}
            onPress={handler.AddContact}
          >
            {buttonLoading ? (
              <ActivityIndicator color={color.palette.white} />
            ) : (
              <Text>
                Add <Text style={{ fontWeight: "bold" }}>{contact.username}</Text>
              </Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  ))

  const handler = {
    AddContact: async () => {
      if (contact) {
        setButtonLoading(true)
        const addNewContactResponse = await new UserResolverAPI().addNewContact(contact.id)
        if (addNewContactResponse.success) {
          setButtonLoading(false)
          Alert.alert(`Add contact`, `Added ${contact.username} to contact successfully!`, [
            {
              onPress: () => {
                setContact(null)
                handleSetFieldValue("searchInput", "")
              },
              text: "Continue",
            },
            {
              onPress: () => navigator.navigate("Wallet"),
              text: "Back to wallet",
            },
          ])
        }
      }
    },
  }
  return (
    <View testID="ContactCreationScreen" style={Style.Container}>
      <Screen unsafe={true} preset="fixed">
        <View style={Style.SearchContainer}>
          <Ionicons
            style={Style.SearchIcon}
            name="search"
            size={15}
            color={color.palette.lightGray}
          />
          <TextInput
            style={Style.InputField}
            autoCapitalize="none"
            placeholderTextColor={color.palette.offGray}
            placeholder={I18n.t("common.form.from.placeholder")}
            onChangeText={(text) => handleSetFieldValue("searchInput", text)}
            value={formValues.searchInput}
          />
        </View>
        {loading ? (
          <NeutronpaySpinner />
        ) : contact ? (
          <RenderContactItem />
        ) : (
          <RenderEmptyContainer />
        )}
      </Screen>
    </View>
  )
})
