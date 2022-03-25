import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchItems } from '../dashboardSlice'

export function Projects() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return <Box>Projects</Box>
}
