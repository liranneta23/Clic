import { useState } from "react"

const useApi = (apiFunc) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const request = async () => {
    const result = await apiFunc()
    if (result.problem) {
      setError(true)
      setLoading(false)
    } else {
      setError(false)
      setLoading(false)
      setData(result.data)
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
