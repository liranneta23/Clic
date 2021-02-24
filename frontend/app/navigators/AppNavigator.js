import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

import ListingEditScreen from "../screens/ListingEditScreen"
import FeedNavigator from "./FeedNavigator"
import AccountNavigator from "./AccountNavigator"
import NewListingButton from "./NewListingButton"
import routeNames from "./routeNames"
import expoPushTokensApi from "../../api/expoPushTokens"

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (!permission.granted) return

      const token = await Notifications.getExpoPushTokenAsync()
      expoPushTokensApi.register(token)
      console.log(token)
    } catch (error) {
      console.log("Error getting a push token", error)
    }
  }
  useEffect(() => {
    let isMounted = false
    registerForPushNotifications()
    return () => (isMounted = true)
  }, [])
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routeNames.FEED}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routeNames.LISTING_EDIT}
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routeNames.LISTING_EDIT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routeNames.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator
