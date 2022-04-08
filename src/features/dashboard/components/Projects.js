import { Grid } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dashboardState, fetchItems } from '../dashboardSlice'
import { ProjectItem } from './ProjectItem'
import { authState } from 'features/auth/authSlice'

export function Projects() {
  const dispatch = useDispatch()
  const authSelector = useSelector(authState)
  const dashboardSelector = useSelector(dashboardState)
  const { filterBy, projects } = dashboardSelector
  // local states
  const [filteredProjects, setFilteredProjects] = useState()
  const [searchedProjects, setSearchedProjects] = useState()

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  useEffect(() => {
    projects.length && filterProjectsFunction()
  }, [projects])

  useEffect(() => {
    // search users by input - set new local state
    let finalFilter = filteredProjects?.filter((project) => {
      if (
        dashboardSelector.filterBy?.name &&
        !project.attributes.name.includes(dashboardSelector.filterBy?.name)
      ) {
        return false
      }
      return true
    })
    setSearchedProjects(finalFilter)
  }, [filterBy])

  // initial projects filter by current user
  const filterProjectsFunction = () => {
    let finalFilteredValue = projects?.filter((project) => {
      let projectEmails = project?.attributes.employees.data.map(
        (employee) => employee.attributes.email
      )
      return projectEmails.includes(authSelector.currentUser.email)
    })
    setFilteredProjects(finalFilteredValue)
  }

  let mapArray = searchedProjects ? searchedProjects : filteredProjects

  return (
    <Grid
      padding="2.5rem 1rem"
      gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
      maxW="1280px"
      m="auto"
      rowGap="0.9rem"
      columnGap="1.5rem">
      {mapArray?.map((project, i) => {
        return <ProjectItem key={i} item={project} />
      })}
    </Grid>
  )
}
