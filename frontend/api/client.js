import { create } from "apisauce"
import cache from "../utility/cache"

const apiClient = create({
  baseURL: "http://192.168.43.233:9000/",
})

// Change the logic of getting to also store and retrieve cached data if available.
const get = apiClient.get

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)

  // This adds a new value (object ) to the existing response variable (object)
  if (response.ok) {
    cache.store(url, response.data)
    return response
  }

  // This simulates a successful response, but it actually gets the data from the cache.
  // If the actual request to the server is successful, it returns the response from the server.
  const data = await cache.get(url)
  return data ? { ok: true, data } : response
}

export default apiClient
