import API from 'services/axios'

export const filterProjectEmployees = async (username) => {
  try {
    const params = new URLSearchParams([
      ['filters[employees][username][$containsi]', username],
      ['populate', 'employees']
    ])
    const response = await API.get('/projects', params)
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
