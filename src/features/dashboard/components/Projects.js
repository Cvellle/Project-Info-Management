import { Grid } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dashboardState, fetchItems } from '../dashboardSlice'
import { ProjectItem } from './ProjectItem'
import { authState } from 'features/auth/authSlice'
import { useDidUpdate } from 'hooks/useDidUpdate'

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

  const filterFunction = () => {
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
  }

  useDidUpdate(filterFunction, [filterBy])

  let mapArray = searchedProjects ? searchedProjects : projects

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
