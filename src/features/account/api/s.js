import API from '../../../services/axios'

export const getMeAPI = async () => {
  try {
    const response = await API.get('/users/me?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
