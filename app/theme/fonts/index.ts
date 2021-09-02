import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    Poppins: require("./Poppins-Regular.ttf"),
    "Poppins-Regular": require("./Poppins-Regular.ttf"),
    Inter: require("./Inter-Regular.ttf"),
    "Inter-Regular": require("./Inter-Regular.ttf"),
    "Inter-SemiBold": require("./Inter-SemiBold.ttf"),
  })
}
