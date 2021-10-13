import * as React from "react"
import { Animated, StyleSheet, View } from "react-native"
import Constants from "expo-constants"
import * as SplashScreen from "expo-splash-screen"

export const AnimatedSplashScreen = ({ children, image }) => {
  const animation = React.useMemo(() => new Animated.Value(1), [])
  const [isAppReady, setAppReady] = React.useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false)

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true))
    }
  }, [isAppReady])

  const onImageLoaded = React.useMemo(
    () => async () => {
      try {
        await SplashScreen.hideAsync()
        await Promise.all([])
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true)
      }
    },
    [],
  )

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "50%",
              height: "50%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={1000}
          />
        </Animated.View>
      )}
    </View>
  )
}
