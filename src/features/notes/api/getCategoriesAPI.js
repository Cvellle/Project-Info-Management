import API from '../../../services/axios'

export const getCategoriesAPI = async () => {
  try {
    const response = await API.get('/categories?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
