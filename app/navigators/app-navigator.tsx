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
import { DepositScreen, ReceiveScreen, SendScreen, WithdrawScreen } from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  Wallet: undefined
  Send: undefined
  Receive: undefined
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
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
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
const exitRoutes = ["dashboard"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
