import React, { useState } from "react"
import { View, Button, Platform, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Screen from "./Screen"
import AppText from "./AppText"
import { useFormikContext } from "formik"
import { set } from "react-native-reanimated"
import { colors } from "../config/colors"
import { ErrorMessage } from "./forms"

const DatePicker = ({ name }) => {
  const [date, setDate] = useState(new Date())
  // const [time, setTime] = useState(new Date(1598051730000).toLocaleTimeString())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext()

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
    setFieldValue(name, new Date(date).toLocaleDateString())
    console.log(values[name])
    // console.log(new Date(event.nativeEvent.timestamp))
    // console.log(new Date(date).toLocaleDateString())
    // console.log(new Date(date).getDate())
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  const showTimepicker = () => {
    showMode("time")
  }

  return (
    <Screen>
      <View>
        <AppText style={styles.container}>{values[name]}</AppText>
        <Button
          onPress={showDatepicker}
          title="Pick date"
          color={colors.secondary}
          onBlur={() => setFieldTouched(name)}
        />
        {/* <Button onPress={showTimepicker} title="Pick time" /> */}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
  text: {
    backgroundColor: "red",
  },
})

export default DatePicker
