import { Grid } from '@chakra-ui/layout'
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
    <Grid
      padding="2.5rem 1rem"
      gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
      maxW="1280px"
      m="auto"
      rowGap="0.9rem"
      columnGap="1.5rem">
      {filteredProjects &&
        filteredProjects.map((project, i) => {
          return <ProjectItem key={i} item={project} />
        })}
    </Grid>
  )
}
