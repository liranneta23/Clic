import React from "react"
import { Image, StyleSheet, View } from "react-native"
import AppText from "../components/AppText"
import ListItem from "../components/ListItem"
import { colors } from "../config/colors"

const ListingDetailsScreen = () => {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/jacket.jpeg")} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Red Jacket for sale</AppText>
        <AppText style={styles.price}>$100</AppText>
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
