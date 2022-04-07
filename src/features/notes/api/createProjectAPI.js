import API from 'services/axios'

export const createProject = async (data) => {
  try {
    const response = await API.post('/projects', { data })
    const { id } = response.data.data
    return id
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
