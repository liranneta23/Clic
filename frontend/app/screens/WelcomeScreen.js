import React from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { colors } from "../config/colors"

const WelcomeScreen = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Clic</Text>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <Text style={styles.text}>Sell What You Don't Need.</Text>
      </View>
      <View style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </View>
      <View style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "couchin",
    fontSize: "180%",
    color: "ghostwhite",
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
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    fontSize: "150%",
    fontFamily: "couchin",
    color: colors.white,
  },
  title: {
    paddingBottom: 30,
    fontSize: "180%",
    fontFamily: "couchin",
    color: colors.white,
  },
})

export default WelcomeScreen
