import React, { useState, useEffect } from "react"
import {
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"

import Screen from "../components/Screen"
import AppCard from "../components/AppCard"
import { colors } from "../config/colors"
import routeNames from "../navigators/routeNames"
import categories from "../config/categories"

import listingsApi from "../../api/listings"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import AppActivityIndicator from "../components/AppActivityIndicator"
import useApi from "../components/custom-hooks/useApi"

const ListingScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false)

  // To use multiple times, do not destructure. just use a variable.
  const { data: listings, error, loading, request: getAllListings } = useApi(
    listingsApi.getListings
  )

  useEffect(() => {
    getAllListings()
  }, [listings])

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>An error occured. Data fetched from cache.</AppText>
            <AppButton
              title="Retry"
              color="primary"
              onPress={() => getAllListings()}
            />
          </>
        )}
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {categories.map((item, key) => {
            return (
              // Flat List Item
              <View style={{ flexDirection: "row" }} key={key}>
                <TouchableOpacity>
                  <AppText
                    style={styles.text}
                    onPress={() => console.log(item.label)}
                  >
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        {listings && (
          <FlatList
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            refreshing={refresh}
            onRefresh={() => getAllListings()}
            renderItem={({ item }) => (
              <AppCard
                title={item.title}
                subTitle={"$" + item.price}
                image={item.images[0].url}
                thumbnail={item.images[0].thumbnailUrl}
                onPress={() =>
                  navigation.navigate(routeNames.LISTING_DETAILS, item)
                }
              />
            )}
          />
        )}
      </Screen>
    </>
  )
}
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    height: "10%",
  },
  text: {
    color: colors.white,
    padding: 10,
    backgroundColor: colors.fancyGray,
  },
})

export default ListingScreen
