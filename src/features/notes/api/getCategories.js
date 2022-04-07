import API from '../../../services/axios'

export const getCategoriesAPI = async () => {
  try {
    const response = await API.get('/users-permissions/categories?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
