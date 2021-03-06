import { Flex, Link, Text, IconButton, Heading, AvatarGroup, Box } from '@chakra-ui/react'
import { projectManager, url } from 'shared/constants'
import { Link as ReactLink } from 'react-router-dom'
import { MdOpenInNew } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Avatar from 'components/UI/Avatar'
import { authState } from 'features/auth/authSlice'
import { selectedProject } from '../projectSlice'
import { PageDescription } from 'components/PageDescription'

const ProjectDescription = () => {
  const project = useSelector(selectedProject)
  const { currentUser } = useSelector(authState)

  return (
    <>
      <Box minH="139px">
        {!!project && (
          <PageDescription
            title={
              <Flex gap="1rem">
                {project?.attributes?.name}
                {currentUser?.role === projectManager && (
                  <Link as={ReactLink} to={`/project/${project?.id}/edit`}>
                    <Flex alignItems="center">
                      <IconButton
                        icon={<MdOpenInNew />}
                        fontSize="md"
                        bgColor="transparent"
                        size="xs"
                      />
                      <Text color="gray.600" fontSize="sm">
                        EDIT
                      </Text>
                    </Flex>
                  </Link>
                )}
              </Flex>
            }
            text={project?.attributes?.description}
            image={`${url && url}${project?.attributes?.logo?.data?.attributes?.url}`}>
            <Flex gap={{ base: '1rem' }} justifyContent={{ base: 'space-around' }}>
              <Flex flexDirection="column" gap="0.4rem">
                <Heading as="h4" fontSize={['sm', 'lg']}>
                  Project Manager
                </Heading>
                <Avatar
                  size="sm"
                  name={project?.attributes?.project_manager?.data?.attributes?.username}
                  src={`${url && url}${
                    project?.attributes?.project_manager?.data?.attributes?.userPhoto?.data
                      ?.attributes?.url
                  }`}
                />
              </Flex>
              <Flex flexDirection="column" gap="0.24em">
                <Heading as="h4" fontSize={['sm', 'lg']}>
                  Employees
                </Heading>
                <AvatarGroup size="sm" max={3}>
                  {project?.attributes.employees.data.map((employee) => (
                    <Avatar
                      key={employee.id}
                      name={employee.attributes.username}
                      src={`${url}${employee?.attributes?.userPhoto?.data?.attributes.url}`}
                    />
                  ))}
                </AvatarGroup>
              </Flex>
            </Flex>
          </PageDescription>
        )}
      </Box>
    </>
  )
}

export default ProjectDescription
