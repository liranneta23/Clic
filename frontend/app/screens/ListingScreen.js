import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet } from "react-native"

import Screen from "../components/Screen"
import AppCard from "../components/AppCard"
import { colors } from "../config/colors"
import routeNames from "../navigators/routeNames"

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
    <Screen style={styles.screen}>
      {loading && (
        <>
          <AppActivityIndicator visible={loading} />
        </>
      )}
      {error && (
        <>
          <AppText>An error occured. Unable to retrieve the listings</AppText>
          <AppButton
            title="Retry"
            color="primary"
            onPress={() => getAllListings()}
          />
        </>
      )}
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
              onPress={() =>
                navigation.navigate(routeNames.LISTING_DETAILS, item)
              }
            />
          )}
        />
      )}
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
