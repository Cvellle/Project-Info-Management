import API from '../../../services/axios'

export const getUser = async (idProp) => {
  try {
    const response = await API.get('/users/' + idProp + '?populate=*')
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
