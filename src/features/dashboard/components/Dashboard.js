import { Container } from '@chakra-ui/react'
import { Projects } from './Projects'
import { Search } from './Search'
// import { useDispatch } from 'react-redux'

export function Dashboard() {
  // const dispatch = useDispatch()

  return (
    <Container>
      <Search />
      <Projects />
    </Container>
  )
}
