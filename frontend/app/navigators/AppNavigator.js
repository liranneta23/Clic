import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import ListingEditScreen from "../screens/ListingEditScreen"
import FeedNavigator from "./FeedNavigator"
import AccountNavigator from "./AccountNavigator"
import NewListingButton from "./NewListingButton"
import routeNames from "./routeNames"

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
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
