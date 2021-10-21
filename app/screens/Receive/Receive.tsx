import React from "react"
import { Alert, View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../../components"
import Style from "./Receive.style"
import useFormValidation from "../../hooks/useFormValidation"
import { FlatList, TextInput } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { color } from "../../theme"
import { UserItem } from "../User/UserItem"
import { User } from "../../models/user/user"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { NormalSpinner } from "../Reusable/NormalSpinner"
import { validationUtil } from "../../utils"
import { UserResolverAPI } from "../../services/resolvers"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"
import { load } from "../../utils/storage"

export const ReceiveScreen = observer(function ReceiveScreen() {
  const [loading, setLoading] = React.useState(false)
  const [tab, switchTab] = React.useState<number>(0)
  const { userStore } = useStores()
  const isFocused = useIsFocused()
  const navigator = useNavigation()
  const { formValues, handleSetFieldValue } = useFormValidation<{
    user: string
    description: string
  }>({
    user: "",
    description: "",
  })

  const [contactList, setContactList] = React.useState<User[]>(userStore.contacts)
  const [nonContact, setNonContact] = React.useState<User>(null)

  const handler = {
    OutAppRequest: () => {
      if (formValues.description === "") {
        return Alert.alert(I18n.t("FORM_VALIDATION_DESCRIPTION_INVALID"))
      }
      return navigator.navigate("TransactionAmountCreation", {
        description: formValues.description,
        action: "RECEIVE",
        type: "OUT_APP",
      })
    },
    InAppRequest: (user: User) => {
      if (formValues.description === "") {
        return Alert.alert(I18n.t("FORM_VALIDATION_DESCRIPTION_INVALID"))
      }
      return navigator.navigate("TransactionAmountCreation", {
        description: formValues.description,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
        action: "RECEIVE",
        type: "IN_APP",
      })
    },
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const contactsCache = await load(STORAGE_KEY.CONTACTS)
      if (!contactsCache) {
        setLoading(true)
        const fetchUserContactsResponse = await userStore.fetchUserContacts()
        if (fetchUserContactsResponse.success) {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [isFocused])

  React.useEffect(() => {
    const fetchContact = async () => {
      if (
        tab === 1 &&
        formValues.user !== nonContact?.username &&
        formValues.user !== nonContact?.email &&
        validationUtil.username(formValues.user)
      ) {
        setLoading(true)
        const searchUserResponse = await new UserResolverAPI().searchUser(formValues.user)
        if (searchUserResponse.success) {
          if (searchUserResponse.data.id !== userStore.currentUser.id) {
            setNonContact(searchUserResponse.data)
          } else {
            setNonContact(null)
          }
        } else {
          setNonContact(null)
        }
        setLoading(false)
      }
    }
    fetchContact()
  }, [formValues.user, tab])

  React.useEffect(() => {
    if (formValues.user !== "" && tab === 1) {
      const filteredContactList = userStore.getContactsByNameAndEmail(formValues.user)
      setContactList((list) => (list = filteredContactList))
    } else {
      setContactList(userStore.contacts)
    }
  }, [formValues.user, tab])

  const RenderMethodContainer = () => (
    <View style={Style.MethodContainer}>
      <Button
        style={{
          ...Style.MethodButton,
          ...Style.MethodActive,
        }}
        onPress={handler.OutAppRequest}
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

  const RenderTabComponent = ({ listData }: { listData: User[] }) =>
    loading ? (
      <NormalSpinner />
    ) : (
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <UserItem user={item} onPressHandler={() => handler.InAppRequest(item)} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={Style.RequestEmptyContainer}>
            <Text style={{ color: color.palette.offGray, fontSize: 25, marginBottom: 15 }}>
              :-)
            </Text>
            <Text style={{ color: color.palette.offGray }} tx="common.empty.contact" />
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
      label: I18n.t("common.request"),
      component: <RenderTabComponent listData={nonContact ? [nonContact] : []} />,
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
            autoCapitalize="none"
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
            autoCapitalize="none"
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
