import API from '../../../services/axios'

export const getNotesAPI = async (id, name, sort) => {
  try {
    const params = new URLSearchParams([
      ['populate', ['author', 'author.userPhoto']],
      ['filters[project][id][$eq]', id],
      ['filters[title][$containsi]', name],
      ['sort[0]', sort]
    ])

    const response = await API.get(`notes`, { params })

    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
