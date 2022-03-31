import { Flex } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItems, selectProjects } from '../dashboardSlice'
import { ProjectItem } from './ProjectItem'
import { authState } from 'features/auth/authSlice'

export function Projects() {
  const [filteredProjects, setFilteredProjects] = useState()
  const dispatch = useDispatch()
  const projectsSelector = useSelector(selectProjects)
  const authSelector = useSelector(authState)

  useEffect(() => {
    dispatch(fetchItems())
    filterProjectsFunction()
  }, [])

  useEffect(() => {
    filterProjectsFunction()
  }, [projectsSelector])

  const filterProjectsFunction = () => {
    let finalFilteredValue = projectsSelector.filter((project) => {
      let projectEmails = project.attributes.employees.data.map(
        (employee) => employee.attributes.email
      )
      return projectEmails.includes(authSelector.currentUser.email)
    })
    setFilteredProjects(finalFilteredValue)
  }

  return (
    <Flex flexWrap="wrap" w="calc(1222px + 15px)" m="30px auto">
      {filteredProjects &&
        filteredProjects.map((project, i) => {
          return <ProjectItem key={i} item={project} />
        })}
    </Flex>
  )
}
