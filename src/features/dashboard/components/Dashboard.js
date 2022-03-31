import { Box } from '@chakra-ui/react'
import rocket from '../../../assets/rocket.png'
import { Projects } from './Projects'
import { PageDescription } from 'components/PageDescription'
import { Search } from './Search'

export function Dashboard() {
  return (
    <Box>
      <PageDescription
        title={'My Projects'}
        text={`Here you'll find all your projects.`}
        image={rocket}>
        <Search />
      </PageDescription>
      <Projects />
    </Box>
  )
}
