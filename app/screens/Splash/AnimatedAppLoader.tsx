import React from "react"
import AppLoading from "expo-app-loading"
import { Asset } from "expo-asset"
import { AnimatedSplashScreen } from "./AnimatedSplashScreen"

export const AnimatedAppLoader = ({ children, image }) => {
  const [isSplashReady, setSplashReady] = React.useState(false)

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => () => Asset.fromURI(image).downloadAsync(),
    [image],
  )

  const onFinish = React.useMemo(() => setSplashReady(true), [])

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync as any}
        onError={console.error}
        onFinish={onFinish as any}
      />
    )
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}
