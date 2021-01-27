import { DefaultTheme } from "@react-navigation/native"
import { colors } from "../config/colors"

//This is passed as theme={navigationTheme} in the App.js
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
}

export default myTheme
