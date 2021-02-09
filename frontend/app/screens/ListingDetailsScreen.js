import React, { useEffect } from "react"
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Image } from "react-native-expo-image-cache"
import { useNavigation } from "@react-navigation/native"

import AppText from "../components/AppText"
import Icon from "../components/Icon"
import ListItem from "../components/ListItem"
import { colors } from "../config/colors"
import AppButton from "../components/AppButton"
import routeNames from "../navigators/routeNames"
import Slider from "../components/Slider"
import Rating from "../components/Ratings"

const ListingDetailsScreen = ({ route }) => {
  const { listing, count } = route.params
  const navigation = useNavigation()

  // Set up in google
  // useEffect(() => {
  //   fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       "37.78825" +
  //       "," +
  //       "-122.4324" +
  //       "&key=" +
  //       "AIzaSyDP1PH7MjRk4mwL8WhKUoIlpMT0mGfGDx0"
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(
  //         "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
  //       )
  //     })
  // }, [])

  return (
    <ScrollView>
      <Slider images={listing.images} height={300} />

      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <View style={styles.seen}>
          <AppText style={styles.price}>${listing.price} </AppText>
          <Icon
            name="eye"
            size={30}
            backgroundColor={colors.primary}
            marginRight={5}
          />
          <AppText style={{ color: colors.primary }}>{count}</AppText>
        </View>
        <View style={styles.contactContainer}>
          <AppText style={{ fontWeight: "700" }}>
            Seller: {listing.seller.name}
          </AppText>
          <Rating
            value={listing.seller.rating}
            numReview={listing.seller.numReview}
          />
          <View style={styles.reachSeller}>
            <Icon
              size={50}
              marginRight={8}
              name="phone"
              backgroundColor={colors.primary}
              onPress={() => Linking.openURL(`tel:${listing.seller.phone}`)}
            />
            <Icon
              size={50}
              name="email"
              backgroundColor={colors.primary}
              onPress={() => Linking.openURL(`mailto:${listing.seller.email}`)}
              marginRight={8}
            />
            <Icon
              size={50}
              name="whatsapp"
              backgroundColor={colors.primary}
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=${
                    "Hello, " +
                    listing.seller.name +
                    `. I am Interested in your ${listing.title}, listed on Clic.`
                  }&phone=${listing.seller.phone}`
                )
              }
              marginRight={8}
            />
            <Icon
              marginRight={20}
              name="google-maps"
              size={50}
              backgroundColor={colors.primary}
              onPress={() =>
                Linking.openURL(
                  `geo:${listing.location.latitude},${listing.location.longitude}`
                )
              }
            />
          </View>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/bonarhyme.jpg")}
            title="Bonaventure Chukwudi"
            subTitle="5 listings"
          />
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contactContainer: {
    justifyContent: "flex-end",
    marginTop: 40,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  userContainer: {
    marginVertical: 40,
  },
  seen: {
    flexDirection: "row",
    marginVertical: 10,
  },
  reachSeller: {
    flexDirection: "row",
    marginTop: 10,
  },
})

export default ListingDetailsScreen
