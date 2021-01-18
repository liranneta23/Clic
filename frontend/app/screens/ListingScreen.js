import React from "react"
import { FlatList, StyleSheet } from "react-native"

import Screen from "../components/Screen"
import AppCard from "../components/AppCard"
import { colors } from "../config/colors"

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

const ListingScreen = () => {
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
          />
        )}
      />
    </Screen>
  )
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.lightGray,
  },
})

export default ListingScreen
