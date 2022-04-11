import API from '../../../services/axios'

export const getProjecAPI = async (id) => {
  try {
    const response = await API.get(
      `/projects/${id}?populate=logo,project_manager,project_manager.userPhoto,employees,employees.userPhoto`
    )

    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
