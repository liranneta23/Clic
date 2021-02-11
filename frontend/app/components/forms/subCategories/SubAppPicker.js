import React, { useContext, useState } from "react"
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Modal,
  Button,
  FlatList,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AppText from "../../AppText"
import { colors } from "../../../config/colors"
import Screen from "../../../components/Screen"
import PickerItem from "../../PickerItem"

const SubAppPicker = ({
  setSelectedValue,
  selectedValue,
  items = [],
  placeholder,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {selectedValue ? (
            <AppText style={styles.text}>{selectedValue.label}</AppText>
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
            data={items.subCategories}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                onPress={() => {
                  setModalVisible(false)
                  setSelectedValue(item)
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
    marginTop: 10,
  },
  text: {
    flex: 1,
    color: colors.fancyGray,
    textTransform: "capitalize",
  },
  placeholder: {
    flex: 1,
    color: colors.meduimBlack,
  },
})

export default SubAppPicker
