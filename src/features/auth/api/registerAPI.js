import API from '../../../services/axios'

export const createUser = async (data) => {
  try {
    const response = await API.post('/auth/local/register', data)
    const { json } = response.data
    return json
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
