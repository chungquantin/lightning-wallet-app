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
  SignInScreen,
  SignUpScreen,
  TransactionCompleteScreen,
  TransactionConfirmScreen,
  TransactionDetailScreen,
  UserDetailScreen,
  WithdrawScreen,
} from "../screens"
import i18n from "i18n-js"
import { useStores } from "../models"
import { observer } from "mobx-react-lite"

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
  UserDetail: undefined
  TransactionDetail: undefined
  TransactionConfirm: undefined
  TransactionComplete: undefined
  SignIn: undefined
  SignUp: undefined
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
  headerBackTitleStyle: {
    fontSize: textStyle.normalSize,
    color: color.primary,
  },
  cardStyle: {
    backgroundColor: color.background,
  },
  headerTintColor: color.primary,
}

const AppStack = observer(() => {
  const { userStore, walletStore } = useStores()
  React.useEffect(() => {
    userStore.fetchCurrentUser()
  }, [])

  React.useEffect(() => {
    walletStore.fetchCurrentUserWallet()
  }, [userStore.currentUser])

  const isSignedIn =
    userStore.currentUser.id !== undefined &&
    walletStore.wallet.id !== undefined &&
    userStore.currentUser.id === walletStore.wallet.userId

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName={isSignedIn ? "Wallet" : "SignIn"}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen options={{ headerShown: false }} name="Wallet" component={Tabs} />
          {/* Send screen stack */}
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
          {/* Receive screen stack */}
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
          <Stack.Screen name="Withdraw" component={WithdrawScreen} />
          <Stack.Screen name="Deposit" component={DepositScreen} />
          <Stack.Screen
            name="UserDetail"
            options={{
              headerBackTitle: i18n.t("navigation.contact"),
            }}
            component={UserDetailScreen}
          />
          <Stack.Screen
            name="TransactionDetail"
            options={{
              headerTitle: i18n.t("navigation.transaction"),
            }}
            component={TransactionDetailScreen}
          />
          <Stack.Screen
            name="TransactionConfirm"
            options={{
              headerTitle: i18n.t("navigation.confirmSend"),
              headerBackTitle: i18n.t("navigation.back"),
            }}
            component={TransactionConfirmScreen}
          />
          <Stack.Screen
            name="TransactionComplete"
            options={{
              headerTitle: i18n.t("navigation.paymentComplete"),
              headerLeft: () => <></>,
            }}
            component={TransactionCompleteScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignIn"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "",
              headerBackTitle: i18n.t("common.auth.signIn"),
            }}
            name="SignUp"
            component={SignUpScreen}
          />
        </>
      )}
    </Stack.Navigator>
  )
})

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
