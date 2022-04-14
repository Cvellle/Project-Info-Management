import API from '../../../services/axios'

export const getNotesAPI = async (id) => {
  try {
    const params = new URLSearchParams([
      ['populate', ['notes', 'notes.author', 'notes.author.userPhoto']]
    ])
    const response = await API.get(`projects/${id}`, { params })
    return response.data.data.attributes.notes
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
