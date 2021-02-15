import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import MyListings from "../screens/MyListingsScreen"
import UserEditScreen from "../screens/UserEditScreen"
import AccountScreen from "../screens/AccountScreen"
import routeNames from "./routeNames"

const Stack = createStackNavigator()

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routeNames.ACCOUNT} component={AccountScreen} />
      <Stack.Screen
        name={routeNames.USER_EDIT_SCREEN}
        component={UserEditScreen}
      />
      <Stack.Screen
        name={routeNames.MY_LISTINGS}
        component={MyListings}
        options={{
          title: "My listings",
        }}
      />
    </Stack.Navigator>
  )
}

export default AccountNavigator
