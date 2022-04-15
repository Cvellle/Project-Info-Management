import {
  Flex,
  IconButton,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  Avatar,
  AvatarGroup,
  Link
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { PageDescription } from 'components/PageDescription'
// import { getProjectAsync } from '../projectSlice'
import { MdOpenInNew } from 'react-icons/md'
import { selectedProject } from '../projectSlice'
import { Link as ReactLink } from 'react-router-dom'
import CategoryTab from './category/CategoryTab'
import { getCatgoriesAsync, notesState } from 'features/notes/notesSlice'

export function Project() {
  // hooks
  const dispatch = useDispatch()
  // const params = useParams()
  // selectors
  const notesSelector = useSelector(notesState)
  const project = useSelector(selectedProject)
  // states
  const { categories } = notesSelector

  useEffect(() => {
    dispatch(getCatgoriesAsync())
  }, [])

  useEffect(() => {
    console.log(categories)
  }, [categories])

  const url = process.env.REACT_APP_BACKEND_URL

  return (
    <>
      <PageDescription
        title={
          <Flex gap="1rem">
            {project?.attributes?.name}
            <Link as={ReactLink} to={`edit`}>
              <Flex alignItems="center">
                <IconButton icon={<MdOpenInNew />} fontSize="md" bgColor="transparent" size="xs" />
                <Text color="gray.600" fontSize="sm">
                  EDIT
                </Text>
              </Flex>
            </Link>
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
              src={`${url && url}${
                project?.attributes?.project_manager?.data?.attributes?.userPhoto?.data?.attributes
                  ?.url
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

      <Tabs margin={{ base: '0', md: '2rem auto' }} maxW="1280px">
        <TabList bgColor="#EAEAEA" color="#8E8E8E">
          <Tab
            _selected={{ bgColor: '#DDDDDD', color: 'black' }}
            padding={{ base: '1rem 0.8rem', md: '1rem 1.5rem' }}>
            <Heading as="h4" fontSize={['sm', 'lg', 'xl']}>
              Project Management
            </Heading>
          </Tab>
          <Tab
            _selected={{ bgColor: '#DDDDDD', color: 'black' }}
            padding={{ base: '1rem 0.8rem', md: '1rem 1.5rem' }}>
            <Heading as="h4" fontSize={['sm', 'lg', 'xl']}>
              Development
            </Heading>
          </Tab>
          <Tab
            _selected={{ bgColor: '#DDDDDD', color: 'black' }}
            padding={{ base: '1rem 0.8rem', md: '1rem 1.5rem' }}>
            <Heading as="h4" fontSize={['sm', 'lg', 'xl']}>
              DevOps
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          {categories?.data.map((category) => (
            <TabPanel key={category.id} bgColor="#F8F8F8">
              <CategoryTab category={category.id} />
            </TabPanel>
          ))}

          {/* <TabPanel bgColor="#F8F8F8">
            <CategoryTab category="Projectxx Management" />
          </TabPanel>
          <TabPanel>
            <CategoryTab category="DevOpss" />
          </TabPanel>
          <TabPanel>DevOps</TabPanel> */}
        </TabPanels>
      </Tabs>
    </>
  )
}
