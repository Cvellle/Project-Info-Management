import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

const API = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use((config) => {
  const token = localStorage.token
  // const token = localStorage.token || JSON.parse(JSON.parse(localStorage['persist:root']).auth).jwt

  if (!token) {
    return config
  } else {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    localStorage.setItem('token', '')
    window.location = '/login'
  }
  return Promise.reject(err)
})

export default API
