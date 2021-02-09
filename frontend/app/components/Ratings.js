import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

import Screen from "./Screen"
import AppText from "./AppText"
import { colors } from "../config/colors"

const Rating = ({
  value = 0,
  text = "Bad boujhhh",
  color = "#f8e825",
  numReview = 0,
}) => {
  return (
    <View>
      <View style={styles.rating}>
        <Text style={styles.textSubHeading}>Ratings:</Text>
        <View>
          {value >= 1 ? (
            <FontAwesome name="star" color={color} size={25} />
          ) : value >= 0.5 ? (
            <FontAwesome name="star-half-empty" color={color} size={25} />
          ) : (
            <FontAwesome name="star-o" color={color} size={25} />
          )}
        </View>
        <View>
          {value >= 2 ? (
            <FontAwesome name="star" color={color} size={25} />
          ) : value >= 1.5 ? (
            <FontAwesome name="star-half-empty" color={color} size={25} />
          ) : (
            <FontAwesome name="star-o" color={color} size={25} />
          )}
        </View>
        <View>
          {value >= 3 ? (
            <FontAwesome name="star" color={color} size={25} />
          ) : value >= 2.5 ? (
            <FontAwesome name="star-half-empty" color={color} size={25} />
          ) : (
            <FontAwesome name="star-o" color={color} size={25} />
          )}
        </View>
        <View>
          {value >= 4 ? (
            <FontAwesome name="star" color={color} size={25} />
          ) : value >= 3.5 ? (
            <FontAwesome name="star-half-empty" color={color} size={25} />
          ) : (
            <FontAwesome name="star-o" color={color} size={25} />
          )}
        </View>
        <View>
          {value >= 5 ? (
            <FontAwesome name="star" color={color} size={25} />
          ) : value >= 4.5 ? (
            <FontAwesome name="star-half-empty" color={color} size={25} />
          ) : (
            <FontAwesome name="star-o" color={color} size={25} />
          )}
        </View>
        <Text style={styles.users}>({numReview} users)</Text>
      </View>
      {/* <View>
        <View style={styles.rating}>
          <Text style={styles.textSubHeading}>Reviews:</Text>
          <AppText>{text}</AppText>
        </View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
  },
  textSubHeading: { paddingRight: 10, fontWeight: "700" },
  users: {
    color: colors.meduimBlack,
    marginLeft: 20,
  },
})

export default Rating
