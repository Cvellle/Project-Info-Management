import API from '../../../services/axios'

export const getProject = async (idProp) => {
  try {
    const response = await API.get('/projects/' + idProp + '?populate=*')
    console.log(response.data)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
