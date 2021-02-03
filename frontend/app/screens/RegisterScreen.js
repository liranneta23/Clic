import React, { useContext, useState } from "react"
import { StyleSheet, Image } from "react-native"
import * as Yup from "yup"
import jwtDecode from "jwt-decode"

import Screen from "../components/Screen"
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms"
import registerApi from "../../api/register"
import authApi from "../../api/auth"
import AuthContext from "../auth/appContext"
import authStorage from "../auth/storage"
import useApi from "../components/custom-hooks/useApi"
import AppActivityIndicator from "../components/AppActivityIndicator"

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
)

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
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

const RegisterScreen = () => {
  // This is used to add a loader...
  const register = useApi(registerApi.register)
  const login = useApi(authApi.login)

  const authContext = useContext(AuthContext)
  const [registerFailed, setRegisterFailed] = useState(false)
  const [error, setError] = useState()

  // This code, regsters the user and then logs them in immediately
  const handleSubmit = async (userInfo) => {
    const result = await register.request(userInfo)

    if (result.problem) {
      setError(result.data.error)
      setRegisterFailed(true)
    } else {
      const result = await login.request(userInfo.email, userInfo.password)

      if (result.problem) {
        setError(
          "Registration successful but we are unable to log you in automatically. Please login."
        )
        setRegisterFailed(true)
      } else {
        const user = jwtDecode(result.data)
        authContext.setUser(user)
        authStorage.storeToken(result.data)
      }
    }
  }

  return (
    <>
      <AppActivityIndicator visible={register.loading || login.loading} />
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
        <ErrorMessage error={error} visible={registerFailed} />
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit
            icon="account"
            name="name"
            placeholder="Name"
          />
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
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
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

export default RegisterScreen
