import API from '../../../services/axios'

export const getOneUser = async (idProp) => {
  try {
    const response = await API.get(`/users?filters[$id][$eq]={${idProp}&populate=*`)
    let returnValue = await response.data.find((project) => project.id == idProp)
    return returnValue
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
