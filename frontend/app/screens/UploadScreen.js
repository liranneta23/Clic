import React from "react"
import { Modal, StyleSheet, View } from "react-native"
import * as Progress from "react-native-progress"
import LottiewView from "lottie-react-native"

import { colors } from "../config/colors"

const UploadScreen = ({ progress = 0, visible = false, onAnimationFinish }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
          />
        ) : (
          <LottiewView
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            source={require("../assets/Animations/done.json")}
          />
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
})

export default UploadScreen
