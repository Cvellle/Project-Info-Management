import API from '../../../services/axios'

export const updateUser = async (idProp, data) => {
  try {
    const response = await API.put('/users/' + idProp, data)
    response && console.log(response.data)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
