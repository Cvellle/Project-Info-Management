import API from '../../../services/axios'
import { projectManager } from 'shared/constants'

export const getProjects = async ({ role, id }) => {
  try {
    const params = new URLSearchParams([
      [
        'populate',
        ['logo', 'project_manager', 'project_manager.userPhoto', 'employees', 'employees.userPhoto']
      ],
      [`filters[${role === projectManager ? projectManager : 'employees'}][id][$eq]`, id]
    ])
    const response = await API.get(`/projects`, { params })
    return response.data
  } catch (ex) {
    throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
  }
}
