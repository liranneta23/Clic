import client from "./client"

const endPoint = "/api/listings"
const getListings = () => client.get(endPoint)

export default {
  getListings,
}
