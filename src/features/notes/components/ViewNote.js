import { Flex, Heading, Button, Image, Box, Center, Link } from '@chakra-ui/react'
import { useEffect } from 'react'
import { getNoteAsync, notesState } from '../notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link as ReactLink } from 'react-router-dom'
import NoteBox from './NoteBox'
import NoteIcon from './NoteIcon'

const ViewNote = () => {
  const url = process.env.REACT_APP_BACKEND_URL
  // hooks
  const dispatch = useDispatch()
  const params = useParams()
  // selectors
  const { selectedNote } = useSelector(notesState)

  useEffect(() => {
    dispatch(getNoteAsync(params.noteId))
  }, [])

  return (
    <>
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
          <Box w="200px"> Title: </Box>
          <Box d="block">{selectedNote?.attributes?.title}</Box>
        </Flex>
        <Flex m="50px">
          <Box w="200px"> Description: </Box> {selectedNote?.attributes?.description}
        </Flex>
        <Flex m="50px">
          <Box w="200px"> Category: </Box>
          {selectedNote?.attributes?.category?.data?.attributes?.name}
        </Flex>
        <Flex flexWrap="wrap" m="50px">
          Files:
          {selectedNote?.attributes?.files?.data?.map((file) =>
            file.attributes.mime?.split('/')[0] === 'image' ? (
              <Center key={file.id} m="30px" h="200px" width="200px">
                <Image src={url + file.attributes.url} height="auto" width="100%" />
              </Center>
            ) : (
              <Center key={file.id} m="30px" h="200px">
                <Flex>
                  <NoteIcon files="[file]" height="auto" width="100" />
                </Flex>
              </Center>
            )
          )}
        </Flex>
        <Link as={ReactLink} to={`edit-note`} d="block" m="auto">
          <Button colorScheme="teal" d="block" m="auto">
            EDIT NOTE
          </Button>
        </Link>
      </NoteBox>
    </>
  )
}

export default ViewNote
