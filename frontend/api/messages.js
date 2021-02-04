import client from "./client"

const endPoint = "/api/messages"

const getMessages = () => client.get(endPoint)

export default {
  getMessages,
}
