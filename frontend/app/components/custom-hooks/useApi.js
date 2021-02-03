import { useState } from "react"

const useApi = (apiFunc) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const request = async (...args) => {
    const result = await apiFunc(...args)
    if (result.problem) {
      setError(true)
      setLoading(false)
      return result
    } else {
      setError(false)
      setLoading(false)
      setData(result.data)
      return result
    }
  }

  return {
    data,
    error,
    loading,
    request,
  }
}
export default useApi
