/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { Tabs } from "./Tabs"
import Style from "./Tabs.style"
import { color, textStyle } from "../theme"
import {
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
  PlaidScreen,
  PaymentMethodScreen,
  NotificationScreen,
  SettingScreen,
  ContactCreationScreen,
  BankAccountDetailScreen,
  BankTransferAmountCreationScreen,
  BankTransferConfirmScreen,
  BankTransferCompleteScreen,
} from "../screens"
import i18n from "i18n-js"
import { useStores } from "../models"
import { observer } from "mobx-react-lite"
import { TransactionAmountCreationScreen } from "../screens/Transaction/TransactionAmountCreation"
import { View } from "react-native"

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
  TransactionAmountCreation: undefined
  ContactCreation: undefined
  BankAccountDetail: undefined
  BankTransferAmountCreation: undefined
  BankTransferConfirm: undefined
  BankTransferComplete: undefined
  SignIn: undefined
  SignUp: undefined
  Plaid: undefined
  PaymentMethod: undefined
  Notification: undefined
  Setting: undefined
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
  headerMode: "none",
}

const AppStack = observer(() => {
  const { userStore, walletStore } = useStores()
  console.log(userStore.currentUser, walletStore.wallet)
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
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <Stack.Navigator
        headerMode="screen"
        mode="modal"
        screenOptions={{
          ...screenOptions,
          cardStyle: {
            opacity: 1,
          },
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
            {/* Reusable screens */}
            <Stack.Screen
              options={{
                headerTitle: "Payment Method",
              }}
              name="PaymentMethod"
              component={PaymentMethodScreen}
            />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen
              name="Setting"
              options={{
                gestureDirection: "horizontal-inverted",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
              component={SettingScreen}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: color.palette.white,
                  elevation: 0,
                },
                headerTitleStyle: {
                  color: color.background,
                },
              }}
              name="Plaid"
              component={PlaidScreen}
            />
            <Stack.Screen
              name="UserDetail"
              options={{
                headerBackTitle: i18n.t("navigation.contact"),
              }}
              component={UserDetailScreen}
            />
            <Stack.Screen
              name="BankAccountDetail"
              options={{
                headerBackTitle: i18n.t("common.back"),
                headerTitle: "Bank Account",
              }}
              component={BankAccountDetailScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: "Add Contact",
              }}
              name="ContactCreation"
              component={ContactCreationScreen}
            />
            <Stack.Screen
              name="TransactionAmountCreation"
              options={{
                headerShown: true,
                headerTitle: "",
              }}
              component={TransactionAmountCreationScreen}
            />
            <Stack.Screen
              name="BankTransferAmountCreation"
              options={{
                headerShown: true,
                headerTitle: "",
              }}
              component={BankTransferAmountCreationScreen}
            />
            <Stack.Screen
              name="BankTransferConfirm"
              options={{
                headerTitle: i18n.t("navigation.confirm"),
                headerBackTitle: i18n.t("navigation.back"),
                headerLeft: () => <></>,
                gestureEnabled: false,
              }}
              component={BankTransferConfirmScreen}
            />
            <Stack.Screen
              name="BankTransferComplete"
              options={{
                headerTitle: i18n.t("navigation.paymentComplete"),
                headerLeft: () => <></>,
                gestureEnabled: false,
              }}
              component={BankTransferCompleteScreen}
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
                headerLeft: () => <></>,
                gestureEnabled: false,
              }}
              component={TransactionConfirmScreen}
            />
            <Stack.Screen
              name="TransactionComplete"
              options={{
                headerTitle: i18n.t("navigation.paymentComplete"),
                headerLeft: () => <></>,
                gestureEnabled: false,
              }}
              component={TransactionCompleteScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                headerLeft: () => <></>,
                gestureEnabled: false,
              }}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: "",
                headerLeft: () => <></>,
                gestureEnabled: false,
                animationEnabled: false,
                headerBackTitle: i18n.t("common.auth.signIn"),
              }}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </View>
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
