import React, { useEffect, useRef } from "react"
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
import navigation from "./RootNavigation"
import listingsApi from "../../api/listings"

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  const notificationListener = useRef()
  const responseListener = useRef()

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (!permission.granted) return

      const token = await Notifications.getExpoPushTokenAsync()
      expoPushTokensApi.register(token)
    } catch (error) {
      console.log("Error getting a push token", error)
    }
  }
  useEffect(() => {
    let isMounted = false
    registerForPushNotifications()

    Notifications.addNotificationResponseReceivedListener(async (notif) => {
      // await console.log(notif.notification.request.content)
      // await console.log(notif.notification.request.content.data.id)
      // await console.log(
      //   new Date(notif.notification.date).toDateString() +
      //     " " +
      //     new Date(notif.notification.date).toLocaleTimeString()
      // )

      const result = await listingsApi.findOne(
        notif.notification.request.content.data.id
      )
      if (result.ok) {
        const resultForCounter = await listingsApi.incrementCounter(
          notif.notification.request.content.data.id
        )
        if (resultForCounter.ok) {
          navigation.navigate(routeNames.LISTING_DETAILS, {
            listing: result.data,
            count: resultForCounter.data.seenCounter,
          })
        } else {
          console.log("notification routing not working.")
        }
      } else {
        navigation.navigate(routeNames.LISTINGS)
      }
    })

    return () => {
      isMounted = true
      // Notifications.removeNotificationSubscription(notificationListener)
      // Notifications.removeNotificationSubscription(responseListener)
    }
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
