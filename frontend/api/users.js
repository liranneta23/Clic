import { NativeModules } from "react-native"
import client from "./client"

const userUpdate = (userDetails, onUploadProgress) => {
  const data = new FormData()

  data.append("name", userDetails.name)
  data.append("email", userDetails.email)
  data.append("phoneNumber", userDetails.phoneNumber)
  data.append("location", userDetails.location)

  userDetails.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  })
  return client.put("api/user/edit", data, {
    // This handles upload time setting
    onUploadProgress: (progressTime) =>
      onUploadProgress(progressTime.loaded / progressTime.total),
  })
}

export default {
  userUpdate,
}
