import API from 'services/axios'

export const deleteNoteFile = async (id) => {
  try {
    const response = await API.delete(`/upload/files/${id}`)
    return response
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
