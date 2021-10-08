import React from "react"
import { observer } from "mobx-react-lite"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ContactScreen, HistoryScreen, ProfileScreen, WalletScreen } from "../screens"
import Style from "./Tabs.style"
import { color } from "../theme"
import { View } from "react-native"
import { Text } from "../components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => (
  <TouchableOpacity style={Style.TabBarCustomButton} onPress={onPress}>
    <LinearGradient
      colors={[color.palette.purple, color.palette.darkPurple]}
      style={Style.TabBarCustomButtonInner}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
)

const CustomHeaderIconButton = ({ size, name, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons
      style={Style.CustomHeaderRightButton}
      name={name}
      color={color.palette.white}
      size={size}
    />
  </TouchableOpacity>
)

interface Props {
  iconStyle?: {
    inactiveColor: string
    activeColor: string
    size: number
  }
}

export const Tabs = observer(function Tabs() {
  const navigator = useNavigation()
  const handler = {
    AddNewContact: () => navigator.navigate("ContactCreation"),
    GoToWallet: () => navigator.navigate("Send"),
    GoToSettings: () => navigator.navigate("Setting"),
    GoToNotification: () => navigator.navigate("Notification"),
  }
  const TabItems = (
    props?: Props,
  ): Partial<{
    key: string
    name: string
    component: React.FunctionComponent<any>
    layout: any
    buttonLayout: any
    headerShown: boolean
    headerRight: any
    headerLeft: any
    headerTitle: string
  }>[] => [
    // First button - Wallet
    {
      headerShown: true,
      headerTitle: "",
      headerRight: () => (
        <TouchableOpacity onPress={handler.GoToNotification}>
          <Ionicons
            style={Style.CustomHeaderRightButton}
            name={"notifications"}
            color={color.palette.offWhite}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 25 }}>
          <TouchableOpacity onPress={handler.GoToSettings}>
            <Ionicons
              style={Style.CustomHeaderRightButton}
              name={"menu"}
              color={color.palette.offWhite}
            />
          </TouchableOpacity>
        </View>
      ),
      key: "wallet-tab",
      name: "Wallet",
      component: WalletScreen,
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Ionicons
            name="wallet-outline"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            tx="navigation.wallet"
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          />
        </View>
      ),
    },
    // Second button - Contact
    {
      headerShown: true,
      key: "contact-tab",
      name: "Contact",
      component: ContactScreen,
      headerRight: () => (
        <CustomHeaderIconButton
          size={props.iconStyle.size}
          onPress={handler.AddNewContact}
          name="add-circle"
        />
      ),
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Feather
            name="users"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            tx="navigation.contact"
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          />
        </View>
      ),
    },
    // Center Button
    {
      headerShown: false,
      key: "qr-code",
      name: "QR Code",
      component: WalletScreen,
      layout: () => <Ionicons name="scan-outline" color={color.palette.offWhite} size={25} />,
      buttonLayout: (props) => <TabBarCustomButton {...props} />,
    },
    // Fourth Button - History
    {
      headerShown: true,
      key: "history-tab",
      name: "History",
      component: HistoryScreen,
      headerRight: () => (
        <CustomHeaderIconButton
          size={props.iconStyle.size}
          onPress={handler.GoToWallet}
          name="add-circle"
        />
      ),
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Ionicons
            name="stats-chart-outline"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            tx="navigation.history"
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          />
        </View>
      ),
    },
    // Fifth Button - Profile
    {
      headerShown: true,
      key: "profile-tab",
      name: "Profile",
      component: ProfileScreen,
      headerRight: () => (
        <CustomHeaderIconButton
          size={props.iconStyle.size}
          onPress={handler.GoToSettings}
          name="settings-sharp"
        />
      ),
      layout: ({ focused }) => (
        <View style={Style.TabItemsView}>
          <Feather
            name="user"
            color={focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor}
            size={props.iconStyle.size}
          />
          <Text
            tx="navigation.profile"
            style={{
              color: focused ? props.iconStyle.activeColor : props.iconStyle.inactiveColor,
              ...Style.TabItemsLabel,
            }}
          />
        </View>
      ),
    },
  ]
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          ...Style.Header,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: color.text,
        },
        tabBarStyle: {
          ...Style.Container,
        },
        tabBarShowLabel: false,
      }}
    >
      {TabItems({
        iconStyle: {
          inactiveColor: color.palette.offGray,
          activeColor: color.primary,
          size: 20,
        },
      }).map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: tab.headerShown,
            headerRight: tab.headerRight,
            headerLeft: tab.headerLeft,
            headerTitle: tab.headerTitle,
            tabBarIcon: tab.layout,
            tabBarButton: tab.buttonLayout,
          }}
        />
      ))}
    </Tab.Navigator>
  )
})
