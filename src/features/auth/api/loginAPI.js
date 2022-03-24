import API from '../../../services/axios'

export const loginUser = async (data) => {
  try {
    const response = await API.post('/auth/local', data)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
