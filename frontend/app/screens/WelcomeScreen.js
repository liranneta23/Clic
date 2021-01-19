import React, { useEffect } from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import AppButton from "../components/AppButton"
import { colors } from "../config/colors"

const WelcomeScreen = () => {
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Clic</Text>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <Text style={styles.text}>Sell What You Don't Need.</Text>
      </View>
      <AppButton title="Login" onPress={() => console.log("Pressed Login")} />
      <AppButton
        title="Register"
        onPress={() => console.log("Pressed Register")}
        color="secondary"
      />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  text: {
    paddingTop: 10,
    fontSize: 25,
    fontFamily: "Roboto",
    color: colors.white,
  },
  title: {
    paddingBottom: 30,
    fontSize: 30,
    fontFamily: "Roboto",
    color: colors.white,
    position: "absolute",
    bottom: 120,
  },
})

export default WelcomeScreen
