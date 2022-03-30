import { Box } from '@chakra-ui/react'

import { Projects } from './Projects'
import { Search } from './Search'

export function Dashboard() {
  return (
    <Box>
      <Search />
      <Projects />
    </Box>
  )
}
