import React from "react"
import { observer } from "mobx-react-lite"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ContactScreen, HistoryScreen, ProfileScreen, WalletScreen } from "../screens"
import Style from "./Tabs.style"
import IonIcon from "react-native-vector-icons/Ionicons"
import ADIcon from "react-native-vector-icons/AntDesign"
import { color } from "../theme"
import { View } from "react-native"
import { Text } from "../components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"

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
}>[] => [
  {
    key: "wallet-tab",
    name: "Wallet",
    component: WalletScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <IonIcon
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
    key: "contact-tab",
    name: "Contact",
    component: ContactScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <ADIcon
          name="contacts"
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
    key: "qr-code",
    name: "QR Code",
    component: WalletScreen,
    layout: () => <ADIcon name="scan1" color={color.palette.offWhite} size={25} />,
    buttonLayout: (props) => <TabBarCustomButton {...props} />,
  },
  {
    key: "history-tab",
    name: "History",
    component: HistoryScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <IonIcon
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
    key: "profile-tab",
    name: "Profile",
    component: ProfileScreen,
    layout: ({ focused }) => (
      <View style={Style.TabItemsView}>
        <IonIcon
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
        headerShown: false,
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
            tabBarIcon: tab.layout,
            tabBarButton: tab.buttonLayout,
          }}
        />
      ))}
    </Tab.Navigator>
  )
})
