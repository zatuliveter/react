import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

import useLocalStorage from './useLocalStorage'

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api'
  
  //const [isLoading, setIsLoading] = useState(false)
  //const [response, setResponse] = useState(null)
  //const [error, setError] = useState(null)
  
  const [result, setResult] = useState({
    isLoading: false,
    isCompleted: false,
    response: null,
    error: null
  })

  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((opt = {}) => {
    setOptions(opt)
    setResult({
      isLoading: true,
      isCompleted: false,
      response: null,
      error: null
    });
  }, [])

  useEffect(() => {
    let skipGetResponseAfterDestroy = false
    if (!result.isLoading) {
      return
    }

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }

    axios(baseUrl + url, requestOptions)
      .then(res => {
        if (!skipGetResponseAfterDestroy) {
          setResult({ ...result, isLoading: false, isCompleted: true, response: res.data, error: null });
          //setResponse(res.data)
          //setIsLoading(false)
        }
      })
      .catch(err => {
        if (!skipGetResponseAfterDestroy) {
          setResult({ ...result, isLoading: false, isCompleted: true, response: null, error: err.response.data });
          //setError(err.response.data)
          //setIsLoading(false)
        }
      })
    return () => {
      skipGetResponseAfterDestroy = true
    }
  }, [result, url, options, token])

  return [result, doFetch]
}
