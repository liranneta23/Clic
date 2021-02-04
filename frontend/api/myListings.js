import client from "./client"

const endPoint = "/api/mylistings"

const getMyListings = () => client.get(endPoint)

export default { getMyListings }
