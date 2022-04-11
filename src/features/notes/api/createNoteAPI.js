import API from 'services/axios'

export const createNoteAPI = async (data) => {
  try {
    const response = await API.post('/notes', { data })

    const { id } = response
    return id
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
