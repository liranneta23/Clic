import { useEffect, useState } from "react"
import * as Location from "expo-location"

export const useLocation = () => {
  const [location, setLocation] = useState()
  const getLocation = async () => {
    try {
      const result = await Location.requestPermissionsAsync()
      if (!result.granted) return
      // This is actually from const result = await Locat....
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync()
      setLocation({ latitude, longitude })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])
  return location
}

export default useLocation
