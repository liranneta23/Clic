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

const ListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const getAllListings = async () => {
    const result = await listingsApi.getListings()
    if (result.problem) {
      setError(true)
      setLoading(false)
    } else {
      setError(false)
      setLoading(false)
      setListings(result.data)
    }
  }
  useEffect(() => {
    getAllListings()
  }, [])

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
