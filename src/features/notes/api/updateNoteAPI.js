import API from 'services/axios'

export const updateNoteAPI = async (id, data) => {
  try {
    const response = await API.put(`/notes/${id}`, { data })
    return response
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
