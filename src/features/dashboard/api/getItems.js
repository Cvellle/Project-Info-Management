import API from '../../../services/axios'

export const getItems = async () => {
  try {
    const response = await API.get('/projects')
    console.log(response)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
