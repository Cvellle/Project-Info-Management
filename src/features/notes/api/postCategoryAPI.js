import API from 'services/axios'

export const postCategoryAPI = async (data) => {
  try {
    const response = await API.post('/categories', data)
    return response
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
