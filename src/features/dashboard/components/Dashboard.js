import { Box } from '@chakra-ui/react'
import { Projects } from './Projects'
import { Search } from './Search'
// import { useDispatch } from 'react-redux'

export function Dashboard() {
  // const dispatch = useDispatch()
  return (
    <Box>
      <Search />
      <Projects />
    </Box>
  )
}
