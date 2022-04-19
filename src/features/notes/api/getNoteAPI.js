import API from '../../../services/axios'

export const getNoteAPI = async (noteId) => {
  try {
    const params = new URLSearchParams([['populate', ['files', 'category']]])

    const response = await API.get(`notes/${noteId}`, { params })
    return response.data.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
