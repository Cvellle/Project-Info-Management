import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItems, selectProjects } from '../dashboardSlice'

export function Projects() {
  const dispatch = useDispatch()
  const projectsSelector = useSelector(selectProjects)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return projectsSelector.map((project, i) => {
    return <Box key={i}>{project.attributes.name}</Box>
  })
}
