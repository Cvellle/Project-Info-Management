import API from '../../../services/axios'

export const getUsers = async () => {
  try {
    const response = await API.get('/profiles?populate=*')
    return response.data.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
