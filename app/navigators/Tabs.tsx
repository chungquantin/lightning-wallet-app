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
import { Ionicons } from "@expo/vector-icons"

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

interface Props {
  iconStyle?: {
    inactiveColor: string
    activeColor: string
    size: number
  }
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
}>[] => [
  {
    headerShown: false,
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
  {
    headerShown: true,
    key: "contact-tab",
    name: "Contact",
    component: ContactScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="ios-globe"
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
  {
    headerShown: false,
    key: "qr-code",
    name: "QR Code",
    component: WalletScreen,
    layout: () => <Ionicons name="scan-outline" color={color.palette.offWhite} size={25} />,
    buttonLayout: (props) => <TabBarCustomButton {...props} />,
  },
  {
    headerShown: true,
    key: "history-tab",
    name: "History",
    component: HistoryScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="ios-stats-chart"
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
  {
    headerShown: true,
    key: "profile-tab",
    name: "Profile",
    component: ProfileScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <Ionicons
          name="person-outline"
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

export const Tabs = observer(function Tabs() {
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
            tabBarIcon: tab.layout,
            tabBarButton: tab.buttonLayout,
          }}
        />
      ))}
    </Tab.Navigator>
  )
})
