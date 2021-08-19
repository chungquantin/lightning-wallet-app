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
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import tronLog from "./utils/tron-log"
import { enableScreens } from "react-native-screens"
import { AppRegistry } from "react-native"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

enableScreens()
console.log = tronLog(false)

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
})

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>(null)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setAppNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  useEffect(() => {
    ;(async () => {
      await initFonts()
      setupRootStore().then(setRootStore)
    })()
  }, [])

  if (!rootStore) return null

  return (
    <ToggleStorybook>
      <ApolloProvider client={client}>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </SafeAreaProvider>
        </RootStoreProvider>
      </ApolloProvider>
    </ToggleStorybook>
  )
}

AppRegistry.registerComponent("NeutronPayWallet", () => App)

export default App
