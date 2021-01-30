import { create } from "apisauce"

const apiClient = create({
  baseURL: "http://192.168.43.233:9000/",
})

export default apiClient
