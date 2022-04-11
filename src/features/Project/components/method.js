import { createProject } from '../api/createProjectAPI'
import { updateProjectAPI } from '../api/updateProjectAPI'
import { uploadLogo } from 'features/Project/api/uploadLogo'

export const method = async ({ id, status, data, employees, currentUser }) => {
  try {
    const modifiedEmployees = employees.map((employee) => ({ id: employee.id }))

    if (data.logo[0]) {
      const logoId = await uploadLogo(data.logo[0])
      if (status === 'create') {
        await createProject({
          ...data,
          logo: logoId,
          employees: modifiedEmployees,
          project_manager: currentUser.id
        })
      } else if (status === 'update') {
        await updateProjectAPI(id, {
          ...data,
          logo: logoId,
          employees: modifiedEmployees
        })
      }
    } else {
      if (status === 'create') {
        await createProject({
          name: data.name,
          description: data.description,
          employees: modifiedEmployees,
          project_manager: currentUser.id
        })
      } else if (status === 'update') {
        await updateProjectAPI(id, {
          name: data.name,
          description: data.description,
          employees: modifiedEmployees
        })
      }
    }
    return true
  } catch {
    return false
  }
}
