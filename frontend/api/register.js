import client from "./client"

const endpoint = "/api/register"

const register = (userInfo) => client.post(endpoint, userInfo)

export default { register }
