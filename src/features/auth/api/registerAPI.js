import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

const API = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const createUser = async (data) => {
  try {
    const response = await API.post('/auth/local/register', data)
    const { json } = response.data
    return json
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}

export default API
