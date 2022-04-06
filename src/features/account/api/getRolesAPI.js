import API from '../../../services/axios'

export const getRoles = async () => {
  try {
    const response = await API.get('/users-permissions/roles?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
