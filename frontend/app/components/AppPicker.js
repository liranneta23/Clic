import React, { useState } from "react"
import { Button, FlatList, Modal, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { colors } from "../config/colors"
import AppText from "./AppText"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Screen from "./Screen"
import PickerItem from "./PickerItem"

const AppPicker = ({
  icon,
  items,
  numberOfColumns = 1,
  placeholder,
  PickerItemComponent = PickerItem,
  selectedItem,
  setSelectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              style={styles.icon}
              color={colors.meduimBlack}
            />
          )}

          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.meduimBlack}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade">
        <Screen>
          <Button title="close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false)
                  setSelectedItem(item)
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: colors.fancyGray,
  },
  placeholder: {
    flex: 1,
    color: colors.meduimBlack,
  },
})

export default AppPicker
