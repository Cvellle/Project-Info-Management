import {
  Flex,
  IconButton,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PageDescription } from 'components/PageDescription'
import { getProjectAsync } from '../projectSlice'
import rocket from '../../../assets/rocket.png'
import { MdOpenInNew } from 'react-icons/md'
import { selectedProject } from '../projectSlice'

export function Project() {
  const dispatch = useDispatch()
  const params = useParams()
  const project = useSelector(selectedProject)

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
  }, [])

  return (
    <>
      <PageDescription
        title={
          <Flex gap="1rem">
            {project?.attributes?.name}
            <Flex alignItems="center">
              <IconButton icon={<MdOpenInNew />} fontSize="md" bgColor="transparent" size="xs" />
              <Text color="gray.600" fontSize="sm">
                EDIT
              </Text>
            </Flex>
          </Flex>
        }
        text={project?.attributes?.description}
        image={rocket}></PageDescription>
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
          <TabPanel>Project Management</TabPanel>
          <TabPanel>Development</TabPanel>
          <TabPanel>DevOps</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
