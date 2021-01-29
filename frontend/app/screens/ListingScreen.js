import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet } from "react-native"

import Screen from "../components/Screen"
import AppCard from "../components/AppCard"
import { colors } from "../config/colors"
import routeNames from "../navigators/routeNames"

import listingsApi from "../../api/listings"
import AppText from "../components/AppText"

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpeg"),
  },
  {
    id: 2,
    title: "Couch in good condition",
    price: 764,
    image: require("../assets/couch.jpg"),
  },
]

const ListingScreen = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() =>
              navigation.navigate(routeNames.LISTING_DETAILS, item)
            }
          />
        )}
      />
    </Screen>
  )
}
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.lightGray,
  },
})

export default ListingScreen
