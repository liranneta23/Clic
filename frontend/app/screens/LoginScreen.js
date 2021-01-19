import { Formik } from "formik"
import React from "react"
import { StyleSheet, Image } from "react-native"
import * as Yup from "yup"

import AppButton from "../components/AppButton"
import AppText from "../components/AppText"
import AppTextInput from "../components/AppTextInput"
import ErrorMessage from "../components/ErrorMessage"

import Screen from "../components/Screen"

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
)

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().required().email().label("Email"),
  password: Yup.string()
    .trim()
    .required()
    .min(6)
    .matches(
      passwordRegex,
      "Password must contain atleast an uppercase, symbol and number characters"
    )
    .label("Password"),
})

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit
              keyboardType="email-address"
              icon="email"
              onChangeText={handleChange("email")}
              placeholder="Email"
              textContentType="emailAddress"
            />
            <ErrorMessage error={errors.email} />
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit
              icon="lock"
              onChangeText={handleChange("password")}
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <ErrorMessage error={errors.password} />
            <AppButton title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Screen>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
})

export default LoginScreen
