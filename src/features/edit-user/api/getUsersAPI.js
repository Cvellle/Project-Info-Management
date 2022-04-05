import API from '../../../services/axios'

export const getUsers = async () => {
  try {
    const response = await API.get('/users?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
