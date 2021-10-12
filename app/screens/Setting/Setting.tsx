import React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import Style from "./Setting.style"
import { useNavigation } from "@react-navigation/core"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useStores } from "../../models"

export const SettingScreen = observer(function SettingScreen() {
  const { userStore } = useStores()
  const navigator = useNavigation()
  React.useEffect(() => {
    navigator.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <TouchableOpacity onPress={handler.GoBack}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={color.palette.purple}
              size={30}
              style={{ marginRight: 10 }}
            />
          </View>
        </TouchableOpacity>
      ),
    })
  }, [])

  const ArrowRight = () => (
    <MaterialIcons name="keyboard-arrow-right" color={color.palette.offGray} size={20} />
  )

  const itemList = [
    {
      logo: "person-outline",
      label: "Profile",
      element: <ArrowRight />,
    },
    {
      logo: "location-outline",
      label: "Location",
      element: <ArrowRight />,
    },
    {
      logo: "lock-closed-outline",
      label: "Change Password",
      element: <ArrowRight />,
    },
    {
      logo: "card-outline",
      label: "Payment method",
      element: <ArrowRight />,
    },
    {
      logo: "finger-print-outline",
      label: "Touch ID/Face ID",
      element: <ArrowRight />,
    },
    {
      logo: "notifications-outline",
      label: "Notifications",
      element: <ArrowRight />,
    },
    {
      logo: "document-text-outline",
      label: "Account Verification (KYC)",
      element: <ArrowRight />,
    },
  ]

  const handler = {
    GoBack: () => navigator.goBack(),
    Logout: () => userStore.logout(),
  }
  const SettingItem = ({ key, label, rightElement, logo }) => (
    <View
      key={key}
      style={{
        backgroundColor: color.secondaryBackground,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderBottomColor: color.palette.darkBlack,
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          style={{
            marginRight: 15,
          }}
          name={logo}
          color={color.primary}
          size={23}
        />
        <Text>{label}</Text>
      </View>

      {rightElement}
    </View>
  )
  return (
    <View testID="SettingScreen" style={Style.Container}>
      <Screen preset="scroll">
        {itemList.map((item) => (
          <SettingItem
            key={item.label}
            logo={item.logo}
            label={item.label}
            rightElement={item.element} />
        ))}
        <Button
          onPress={handler.Logout}
          style={{
            backgroundColor: color.primary,
            marginTop: 20,
            marginHorizontal: 20,
            height: 40,
          }}
          textStyle={{ fontSize: 16 }}
          tx="common.auth.logout"
        />
      </Screen>
    </View>
  )
})
