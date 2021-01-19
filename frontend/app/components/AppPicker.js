import React, { useState } from "react"
import { Button, FlatList, Modal, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { defaultStyles } from "../config/styles"
import { colors } from "../config/colors"
import AppText from "./AppText"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Screen from "./Screen"
import PickerItem from "./PickerItem"

const AppPicker = ({
  icon,
  items,
  onSelectedItem,
  placeholder,
  selectedItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            style={styles.icon}
            color={colors.meduimBlack}
          />
          <AppText style={styles.picker}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
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
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false)
                  onSelectedItem(item)
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
    width: "100%",
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    color: colors.fancyGray,
  },
})

export default AppPicker
