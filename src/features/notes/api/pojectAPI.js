import API from '../../../services/axios'

export const getProject = async (id) => {
  try {
    const response = await API.get(`/projects/${id}`)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
