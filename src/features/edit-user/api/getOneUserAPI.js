import API from '../../../services/axios'

export const getOneUser = async (idProp) => {
  try {
    console.log(idProp)
    const response = await API.get('/profiles/' + idProp + '?populate=*')
    response && console.log(response.data)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}