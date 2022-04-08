import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import ProjectForm from './ProjectForm'
import { Box } from '@chakra-ui/react'

export const CreateProject = () => {
  return (
    <>
      <PageDescription title="Create Project" text="Create a new project" image={rocket} />
      <Box
        bgColor="#F8F8F8"
        maxW="1280px"
        m={{ base: 'auto', md: '2rem auto' }}
        padding={{ base: '2rem 0.6rem', md: '3rem' }}
        borderRadius="0.4rem">
        <ProjectForm status="create" />
      </Box>
    </>
  )
}
