import API from 'services/axios'

export const updateProjectAPI = async (projectId, data) => {
  try {
    const response = await API.put(`/projects/${projectId}`, { data })
    const { id } = response.data.data
    return id
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
