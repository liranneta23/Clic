import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { StyleSheet, View } from "react-native"
import WelcomeScreen from "../screens/WelcomeScreen"
import RegisterScreen from "../screens/RegisterScreen"
import LoginScreen from "../screens/LoginScreen"

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default AuthNavigator
