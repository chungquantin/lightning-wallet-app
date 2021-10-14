import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  AppNavigator,
  canExit,
  setAppNavigation,
  useNavigationPersistence,
} from "./navigators"
import { Provider, Snackbar } from "react-native-paper"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { enableScreens } from "react-native-screens"
import { Tron } from "./services/reactotron/tron"
import { SnackBarContext } from "./constants/Context"
import { AnimatedAppLoader } from "./screens/Splash/AnimatedAppLoader"
import Constants from "expo-constants"
import { color } from "./theme"
import axios from "axios"
import { DummyApi } from "./services/resolvers"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

console.log = (...args) => {
  Tron.display({
    name: "CONSOLE.LOG",
    important: true,
    value: args,
    preview: args.length ? JSON.stringify(args) : args[0],
  })
}

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>(null)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [visible, setVisible] = useState<boolean>(false)
  const [snackBar, setSnackBar] = useState({
    text: "",
    actionLabel: "",
    actionOnPress: () => {},
    duration: 500,
  })

  setAppNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)

  // otherwise, we're ready to render the app
  const MainScreen = () => (
    <ToggleStorybook>
      <Provider>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SnackBarContext.Provider
              value={{ ...snackBar, onDismissSnackBar, onToggleSnackBar, setSnackBar }}
            >
              <AppNavigator
                theme={{
                  dark: true,
                  colors: {
                    border: color.borderLight,
                    background: color.background,
                    primary: color.primary,
                    card: color.secondaryBackground,
                    text: color.text,
                    notification: color.background,
                  },
                }}
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={snackBar.duration}
                action={{
                  label: snackBar.actionLabel,
                  onPress: () => snackBar.actionOnPress,
                }}
              >
                {snackBar.text}
              </Snackbar>
            </SnackBarContext.Provider>
          </SafeAreaProvider>
        </RootStoreProvider>
      </Provider>
    </ToggleStorybook>
  )
  return (
    <AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
      <MainScreen />
    </AnimatedAppLoader>
  )
}

export default App
