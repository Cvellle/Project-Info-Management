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
  const { currentUser } = authSelector
  // local states
  const [searchedProjects, setSearchedProjects] = useState()

  useEffect(() => {
    dispatch(fetchItems({ role: currentUser.role, id: currentUser.id }))
  }, [])

  useEffect(() => {
    console.log(projects)
  }, [projects])

  useEffect(() => {
    // search users by input - set new local state
    let finalFilter = projects?.filter((project) => {
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

  let mapArray = searchedProjects ? projects : projects

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
