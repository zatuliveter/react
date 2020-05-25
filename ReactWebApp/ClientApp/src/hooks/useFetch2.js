import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

import useLocalStorage from './useLocalStorage'

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api'
  
  const [result, setResult] = useState({
    isLoading: false,
    isCompleted: false,
    isSuccess: null,
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
      isSuccess: null,
      response: null,
      error: null
    });
  }, [])

  useEffect(() => {
    let isDestroyed = false
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
        if (!isDestroyed) {
          setResult({
             ...result, 
             isLoading: false, 
             isCompleted: true, 
             isSuccess: true,
             response: res.data, 
             error: null
          })
        }
      })
      .catch(err => {
        if (!isDestroyed) {
          setResult({
             ...result, 
             isLoading: false, 
             isCompleted: true,
             isSuccess: false,
             response: null, 
             error: err.response.data
          });
        }
      })
    return () => {
      isDestroyed = true
    }
  }, [result, url, options, token])

  return [result, doFetch]
}
