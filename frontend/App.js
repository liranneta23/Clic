import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
  Switch,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, useNavigation } from "@react-navigation/native"

import ViewImageScreen from "./app/screens/ViewImageScreen"
import WelcomeScreen from "./app/screens/WelcomeScreen"
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen"
import MessagesScreen from "./app/screens/MessagesScreen"
import ListingScreen from "./app/screens/ListingScreen"
import Icon from "./app/components/Icon"
import Screen from "./app/components/Screen"
import ListItem from "./app/components/ListItem"
import AccountScreen from "./app/screens/AccountScreen"
import AppTextInput from "./app/components/AppTextInput"
import AppPicker from "./app/components/AppPicker"
import LoginScreen from "./app/screens/LoginScreen"
import ListingEditScreen from "./app/screens/ListingEditScreen"
import AppButton from "./app/components/AppButton"
import ImageInput from "./app/components/ImageInput"
import ImageInputList from "./app/components/ImageInputList"
import RegisterScreen from "./app/screens/RegisterScreen"
import AuthNavigator from "./app/navigators/AuthNavigator"
import navigationTheme from "./app/navigators/navigationTheme"

const GoBack = () => {
  const navigation = useNavigation()

  return (
    <AppButton
      title="Go back style"
      color="blue"
      onPress={() => navigation.goBack()}
    />
  )
}

const Tweets = ({ navigation }) => {
  return (
    <Screen>
      <Text>Tweets</Text>
      <AppButton
        title="View Tweets"
        onPress={() => navigation.navigate("TweetDetails", { id: 7676 })}
      />
    </Screen>
  )
}
const TweetDetails = ({ navigation, route }) => {
  return (
    <Screen>
      <Text>TweetDetails {route.params.id}</Text>
      <GoBack />
    </Screen>
  )
}

const Stack = createStackNavigator()
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "maroon" },
      }}
    >
      <Stack.Screen
        name="Tweets"
        component={Tweets}
        options={{
          title: "Tweet Details",
          headerStyle: { backgroundColor: "yellow" },
        }}
        // Or set title using functions and access routes
        // options={({ route }) => ({ title: route.params.id })}
      />
      <Stack.Screen
        name="TweetDetails"
        component={TweetDetails}
        // Or set title using functions and access routes
        options={({ route }) => ({ title: route.params.id })}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "tomato",
        activeTintColor: "white",
        inactiveBackgroundColor: "#eee",
        inactiveTintColor: "#101010",
      }}
    >
      <Tab.Screen
        name="Tweets"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  )
}
