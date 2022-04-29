import { Grid, Center, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dashboardState, fetchItems, resetProjects } from '../dashboardSlice'
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
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchItemsFunction()

    return () => {
      dispatch(resetProjects())
      setLoaded(false)
    }
  }, [])

  const fetchItemsFunction = async () => {
    let a = await dispatch(fetchItems({ role: currentUser.role, id: currentUser.id }))
    a && setLoaded(true)
  }

  const filterFunction = () => {
    let finalFilter = projects?.filter((project) => {
      if (
        dashboardSelector.filterBy?.name &&
        !project.attributes.name
          .toLowerCase()
          .includes(dashboardSelector.filterBy?.name.toLowerCase())
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
    <>
      {mapArray && loaded ? (
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
      ) : (
        <Center h="70vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  )
}
