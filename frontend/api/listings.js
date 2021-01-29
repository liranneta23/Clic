import client from "./client"

const endPoint = "/"
const getListings = () => client.get(endPoint)

export default{
    getListings,
}