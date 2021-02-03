import React, { useContext, useState } from "react"
import { StyleSheet, Image } from "react-native"
import * as Yup from "yup"
import jwtDecode from "jwt-decode"

import Screen from "../components/Screen"
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms"
import authApi from "../../api/auth"
import AuthContext from "../auth/appContext"
import authStorage from "../auth/storage"

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
)

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().required().email().label("Email"),
  password: Yup.string().trim().required().label("Password"),
})

const LoginScreen = () => {
  const authContext = useContext(AuthContext)
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password)
    if (!result.ok) return setLoginFailed(true)

    setLoginFailed(false)
    const user = jwtDecode(result.data)
    authContext.setUser(user)
    authStorage.storeToken(result.data)
  }
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid email or password" visible={loginFailed} />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          keyboardType="email-address"
          icon="email"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
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
