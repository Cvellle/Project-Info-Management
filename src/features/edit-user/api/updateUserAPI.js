import API from '../../../services/axios'

export const updateUser = async (idProp, data) => {
  try {
    const response = await API.put('/users/' + idProp, data)
    console.log(response)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
