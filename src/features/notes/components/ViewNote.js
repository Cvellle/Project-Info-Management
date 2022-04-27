import { Flex, Heading, Button, Image, Box, Center, Link, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useParams, Link as ReactLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearSelectedNote,
  getCatgoriesAsync,
  getNoteAsync,
  getProjectAsync,
  notesState
} from '../notesSlice'
import NoteBox from './NoteBox'
import NoteIcon from './NoteIcon'
import { FiDownload } from 'react-icons/fi'
import { downloadFileAPI } from '../api/downloadFileAPI'

const ViewNote = () => {
  const url = process.env.REACT_APP_BACKEND_URL
  // hooks
  const dispatch = useDispatch()
  const params = useParams()
  // selectors
  const { selectedNote } = useSelector(notesState)

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
    dispatch(getNoteAsync(params.noteId))
    dispatch(getCatgoriesAsync())

    return () => {
      dispatch(clearSelectedNote())
    }
  }, [])

  const downloadFile = (passedProps) => {
    downloadFileAPI(passedProps)
  }

  console.log(selectedNote)

  return (
    <>
      {selectedNote !== null ? (
        <Box>
          <NoteBox title="See Note">
            <Flex
              padding={{ base: '20px', md: 'none' }}
              pl={{ base: '20px', md: '45px' }}
              flexWrap={'wrap'}
              margin={{ base: '0', md: '49px 0' }}
              justifyContent={{ base: 'center', md: 'unset' }}>
              <Heading as="h5" fontSize={['sm', 'lg', 'xl']}>
                Note Info
              </Heading>
            </Flex>
            <Flex m="50px">
              <Box w={{ base: '100%', lg: '200px' }} fontWeight="700">
                {' '}
                Title:{' '}
              </Box>
              <Box d="block">{selectedNote?.attributes?.title}</Box>
            </Flex>
            <Flex m="50px">
              <Box w={{ base: '100%', lg: '200px' }} fontWeight="700">
                {' '}
                Description:{' '}
              </Box>{' '}
              {selectedNote?.attributes?.description}
            </Flex>
            <Flex m="50px">
              <Box w={{ base: '100%', lg: '200px' }} fontWeight="700">
                {' '}
                Category:{' '}
              </Box>
              {selectedNote?.attributes?.category?.data?.attributes?.name}
            </Flex>
            <Flex flexWrap="wrap" m="50px">
              <Box w={{ base: '100%', lg: '200px' }} fontWeight="700">
                {' '}
                Files:{' '}
              </Box>

              {selectedNote?.attributes?.files?.data?.map((file) =>
                file.attributes.mime?.split('/')[0] === 'image' ? (
                  <Box key={file.id} mr="30px" mb="30px">
                    <a
                      href={url + file.attributes.url}
                      target="_blank"
                      rel="noreferrer"
                      h="150px"
                      width="150px">
                      <Center h="150px" width="150px" border="1px solid lightgray" p="30px">
                        <Image src={url + file.attributes.url} height="auto" width="100%" />
                      </Center>
                    </a>
                    <Box mb="20px"> {file.attributes.name}</Box>
                    <Box
                      cursor="pointer"
                      m="auto"
                      onClick={() =>
                        downloadFile({
                          path: url + file.attributes.url,
                          name: file.attributes.name,
                          extension: file.attributes.ext
                        })
                      }>
                      <FiDownload />
                    </Box>
                  </Box>
                ) : (
                  <Box key={file.id} mr="30px" mb="30px">
                    <a
                      href={url + file.attributes.url}
                      target="_blank"
                      rel="noreferrer"
                      h="150px"
                      width="150px">
                      <Center h="150px" width="150px" border="1px solid lightgray" p="30px">
                        <Flex>
                          <NoteIcon files="[file]" height="auto" width="100" />
                        </Flex>
                      </Center>
                    </a>
                    <Box mb="20px"> {file.attributes.name}</Box>
                    <Box
                      cursor="pointer"
                      m="auto"
                      onClick={() =>
                        downloadFile({
                          path: url + file.attributes.url,
                          name: file.attributes.name,
                          extension: file.attributes.ext
                        })
                      }>
                      <FiDownload />
                    </Box>
                  </Box>
                )
              )}
            </Flex>
            <Link as={ReactLink} to={`edit-note`} d="block" m="auto">
              <Button colorScheme="teal" d="block" m="auto">
                EDIT NOTE
              </Button>
            </Link>
          </NoteBox>
        </Box>
      ) : (
        <Center h="60vh">
          <Spinner />
        </Center>
      )}
    </>
  )
}

export default ViewNote
