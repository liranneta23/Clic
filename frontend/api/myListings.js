import client from "./client"

const endPoint = "/api/mylistings"

const getMyListings = () => client.get(endPoint)
const deleteMyListing = (id) => client.delete(endPoint + `/${id}`)

export default { getMyListings, deleteMyListing }
