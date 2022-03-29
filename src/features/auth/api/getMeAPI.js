import API from '../../../services/axios'

export const getMeAPI = async (idProp) => {
  try {
    const response = await API.get('/users/me' + idProp)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
