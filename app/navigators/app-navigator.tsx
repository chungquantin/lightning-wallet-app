/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Tabs } from "./Tabs"
import Style from "./Tabs.style"
import { color, textStyle } from "../theme"
import {
  DepositScreen,
  ReceiveInAppRequestScreen,
  ReceiveOutAppRequestScreen,
  ReceiveScreen,
  SendInAppRequestScreen,
  SendOutAppRequestScreen,
  SendScreen,
  WithdrawScreen,
} from "../screens"
import i18n from "i18n-js"

export type NavigatorParamList = {
  Wallet: undefined
  Send: undefined
  SendOutAppRequest: undefined
  SendInAppRequest: undefined
  Receive: undefined
  ReceiveOutAppRequest: undefined
  ReceiveInAppRequest: undefined
  Withdraw: undefined
  Deposit: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<NavigatorParamList>()

const screenOptions = {
  headerShown: true,
  headerStyle: {
    ...Style.Header,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: color.text,
  },
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerBackTitleStyle: {
          fontSize: textStyle.normalSize,
          color: color.primary,
        },
        cardStyle: {
          backgroundColor: color.background,
        },
        headerTintColor: color.primary,
      }}
      initialRouteName="Wallet"
    >
      <Stack.Screen options={{ headerShown: false }} name="Wallet" component={Tabs} />
      <>
        <>
          <Stack.Screen name="Send" component={SendScreen} />
          <Stack.Screen
            name="SendOutAppRequest"
            options={{
              headerTitle: i18n.t("navigation.scanQrCode"),
            }}
            component={SendOutAppRequestScreen}
          />
          <Stack.Screen
            name="SendInAppRequest"
            options={{
              headerTitle: i18n.t("navigation.sendToFriend"),
            }}
            component={SendInAppRequestScreen}
          />
        </>
        <>
          <Stack.Screen name="Receive" component={ReceiveScreen} />
          <Stack.Screen
            name="ReceiveOutAppRequest"
            options={{
              headerTitle: i18n.t("navigation.request"),
            }}
            component={ReceiveOutAppRequestScreen}
          />
          <Stack.Screen
            name="ReceiveInAppRequest"
            options={{
              headerTitle: i18n.t("navigation.request"),
            }}
            component={ReceiveInAppRequestScreen}
          />
        </>
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
      </>
    </Stack.Navigator>
  )
}

export const AppNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <AppStack />
    </NavigationContainer>
  )
})

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["Wallet"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
