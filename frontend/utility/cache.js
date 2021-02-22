import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

const prefix = "cache"
const expiryTimeInMinutes = 1000

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    }
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item))
  } catch (error) {
    console.log(error)
  }
}

const hasExpired = () => {
  // This determines whether a cache has expired.
  const now = moment(Date.now())
  const storedTime = moment(item.timestamp)
  return now.diff(storedTime, "minutes") > expiryTimeInMinutes
}

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key)
    const item = JSON.parse(value)

    if (!item) return null

    // This removes the expired data from the cache.
    if (hasExpired(item)) {
      AsyncStorage.removeItem(prefix + key)
      return null
    }

    return item.value
  } catch (error) {
    console.log(error)
  }
}

const removeAllAsyncStorage = () => {
  AsyncStorage.getAllKeys()
    .then((keys) => AsyncStorage.multiRemove(keys))
    .then(() => alert("You logged just out."))
}

export default {
  store,
  get,
  removeAllAsyncStorage,
}
