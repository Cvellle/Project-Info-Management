import API from '../../../services/axios'

export const getItems = async (payloadProp) => {
  console.log(payloadProp.role, payloadProp.id)
  try {
    const response = await API.get(
      `/projects?populate=logo,project_manager,project_manager.userPhoto,employees,employees.userPhoto
      &filters[${payloadProp.role}]
      [id]
      [$eq]=${payloadProp.id}
      `
    )
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
