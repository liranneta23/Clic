import React from "react"
import { StyleSheet, View } from "react-native"
import { Image } from "react-native-expo-image-cache"

import AppText from "../components/AppText"
import ListItem from "../components/ListItem"
import { colors } from "../config/colors"

const ListingDetailsScreen = ({ route }) => {
  const listing = route.params

  return (
    <View>
      <Image
        style={styles.image}
        uri={listing.images[0].url}
        preview={{ uri: listing.images[0].url }}
        tint="light"
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/bonarhyme.jpg")}
            title="Bonaventure Chukwudi"
            subTitle="5 listings"
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  userContainer: {
    marginVertical: 40,
  },
})

export default ListingDetailsScreen
