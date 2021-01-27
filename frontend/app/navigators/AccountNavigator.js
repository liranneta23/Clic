import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import MyListings from "../screens/MyListingsScreen"
import MessagesScreen from "../screens/MessagesScreen"
import AccountScreen from "../screens/AccountScreen"
import routeNames from "./routeNames"

const Stack = createStackNavigator()

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routeNames.ACCOUNT} component={AccountScreen} />
      <Stack.Screen
        name={routeNames.MY_LISTINGS}
        component={MyListings}
        options={{
          title: "My listings",
        }}
      />
      <Stack.Screen name={routeNames.MESSAGES} component={MessagesScreen} />
    </Stack.Navigator>
  )
}

export default AccountNavigator
