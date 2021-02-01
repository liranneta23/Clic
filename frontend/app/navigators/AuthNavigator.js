import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import WelcomeScreen from "../screens/WelcomeScreen"
import RegisterScreen from "../screens/RegisterScreen"
import LoginScreen from "../screens/LoginScreen"
import routeNames from "./routeNames"

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routeNames.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={routeNames.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={routeNames.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
