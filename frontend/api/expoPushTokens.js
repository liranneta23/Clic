import client from "./client"

const register = (pushToken) =>
  client.put("/api/user/notifications", { token: pushToken })

export default {
  register,
}
