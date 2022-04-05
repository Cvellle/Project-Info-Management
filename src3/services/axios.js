import axios from 'axios'

export const apiURL = process.env.REACT_APP_API_URL

const API = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use((config) => {
  try {
    const token = JSON.parse(JSON.parse(localStorage['persist:root']).auth).jwt
    config.headers.Authorization = `Bearer ${token}`
    return config
  } catch {
    return config
  }
})

API.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    // window.location = '/login'
  }
  return Promise.reject(err)
})

export default API
