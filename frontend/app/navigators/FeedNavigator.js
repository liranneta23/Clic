import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import ListingScreen from "../screens/ListingScreen"
import ListingDetailsScreen from "../screens/ListingDetailsScreen"
import routeNames from "./routeNames"

const Stack = createStackNavigator()

const FeedNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routeNames.LISTINGS} component={ListingScreen} />
      <Stack.Screen
        name={routeNames.LISTING_DETAILS}
        component={ListingDetailsScreen}
      />
    </Stack.Navigator>
  )
}

export default FeedNavigator
