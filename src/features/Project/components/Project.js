import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  Link,
  Button,
  Box,
  Center,
  Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as ReactLink, useParams } from 'react-router-dom'
import { emptyProject, selectedProject } from '../projectSlice'
import CategoryTab from './category/CategoryTab'
import { getCatgoriesAsync, notesState, resetNotes } from 'features/notes/notesSlice'
import { getProjectAsync } from 'features/Project/projectSlice'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'
import { useWillUnmount } from 'hooks/useWillUnmount'

export function Project() {
  // hooks
  const dispatch = useDispatch()
  const params = useParams()
  // selectors
  const notesSelector = useSelector(notesState)
  const project = useSelector(selectedProject)
  const authSelector = useSelector(authState)
  // states
  const { categories } = notesSelector
  const { currentUser } = authSelector
  const [tabCounter, setTabCounter] = useState(categories.data[0].id)

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
    dispatch(getCatgoriesAsync())
  }, [])

  const resetFunction = () => {
    dispatch(resetNotes())
    dispatch(emptyProject())
  }

  useWillUnmount(resetFunction)

  const setTabCounterFunction = (counter) => {
    setTabCounter(counter)
  }

  let currentTab = categories?.data?.filter((el) => el.id === tabCounter)

  return (
    <>
      {project ? (
        <Box>
          <Tabs
            margin={{ base: '0', md: '2rem auto' }}
            maxW="1280px"
            minH={{ base: '141px' }}
            position="relative"
            pt={{ base: '80px', md: '0' }}>
            <Link
              as={ReactLink}
              size="sm"
              to="add-note"
              position="absolute"
              right={{ base: '5%', md: '38px' }}
              top={{ base: '20px', md: 'calc(48px + 26px)' }}
              _hover={{ textDecoration: 'none' }}
              ml={{ base: 'none', md: 'auto' }}
              width={{ base: '90%', md: '142px' }}
              height={{ base: '40px', md: '48px' }}>
              {currentUser?.role === projectManager && (
                <Button
                  colorScheme="teal"
                  size="sm"
                  width={{ base: '100%' }}
                  height={{ base: '100%' }}
                  fontWeight={'600'}
                  fontSize="18px">
                  ADD NOTE
                </Button>
              )}
            </Link>
            <TabList
              bgColor="#EAEAEA"
              color="#8E8E8E"
              d="flex"
              flexWrap="wrap"
              minH={{ base: '48px' }}>
              {categories?.data?.map((category) => (
                <Tab
                  minWidth={{ base: '100%', md: 'auto' }}
                  key={category.id}
                  _selected={{ bgColor: '#DDDDDD', color: 'black' }}
                  padding={{ base: '1rem 0.8rem', md: '1rem 1.5rem' }}
                  onClick={() => setTabCounterFunction(category.id)}>
                  <Heading as="h4" fontSize={['sm', 'lg', 'xl']}>
                    {category.attributes.name}
                  </Heading>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {categories?.data?.map((category) => {
                return (
                  <TabPanel key={category.id} bgColor="#F8F8F8">
                    {category.id === currentTab[0].id && <CategoryTab category={category.id} />}
                  </TabPanel>
                )
              })}
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <Center h="70vh" opacity="0.5">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  )
}
