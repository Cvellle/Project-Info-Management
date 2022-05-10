import {
  Flex,
  Heading,
  Button,
  Image,
  Box,
  Center,
  Link,
  Spinner,
  CloseButton
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams, Link as ReactLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { TiEyeOutline } from 'react-icons/ti'

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
import { projectManager, url } from 'shared/constants'
import { authState } from 'features/auth/authSlice'
import DisplayText from './DisplayText'
// import DisplayVideo from './DisplayVideo'

const ViewNote = () => {
  // hooks
  const dispatch = useDispatch()
  const params = useParams()
  // selectors
  const { selectedNote } = useSelector(notesState)
  const authSelector = useSelector(authState)
  // states
  const { currentUser } = authSelector
  const [counter, setCounter] = useState(0)
  const [activeItem, setActiveItem] = useState()
  const [filesArray, setFilesArray] = useState([])
  const [galleryVisible, setGalleryVisible] = useState(false)

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
    dispatch(getNoteAsync(params.noteId))
    dispatch(getCatgoriesAsync())

    return () => {
      dispatch(clearSelectedNote())
    }
  }, [])

  useEffect(() => {
    setFilesArray(
      selectedNote?.attributes?.files?.data?.map((el) => {
        return {
          file: el,
          active: false
        }
      })
    )
  }, [selectedNote])

  useEffect(() => {
    setActiveItem(filesArray[counter])
  }, [counter])

  const downloadFile = (passedProps) => {
    downloadFileAPI(passedProps)
  }

  const moveLeft = async () => {
    setCounter(counter - 1)
    counter === 0 && setCounter(filesArray.length - 1)
  }

  const moveRight = () => {
    setCounter(counter + 1)
    counter === filesArray?.length - 1 && setCounter(0)
  }

  const setCounterByIndex = async (indexProp) => {
    setCounter(indexProp)
  }

  const openGallery = (index) => {
    let res = setCounterByIndex(index)
    res && !res.error && setGalleryVisible(true)
  }

  return (
    <Box minH="100%">
      {selectedNote !== null ? (
        <Box>
          <NoteBox title="See Note">
            <Flex
              padding={{ base: '20px', md: 'none' }}
              pl={{ base: '20px', md: '45px' }}
              flexWrap={'wrap'}
              margin={{ base: '0', md: '49px 0' }}
              justifyContent={{ base: 'center', lg: 'unset' }}>
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

              {selectedNote?.attributes?.files?.data?.map((file, i) => (
                <Box key={file.id} mr="30px" mb="30px" cursor="pointer">
                  <Box onClick={() => openGallery(i)}>
                    <Center h="150px" width="150px" border="1px solid lightgray" p="30px">
                      {file.attributes.mime?.split('/')[0] === 'image' ? (
                        <Image src={url + file.attributes.url} height="auto" width="100%" />
                      ) : (
                        <Flex>
                          <NoteIcon files="[file]" height="auto" width="100" />
                        </Flex>
                      )}
                    </Center>
                  </Box>
                  <Box mb="20px"> {file.attributes.name}</Box>
                  <Flex
                    w="100%"
                    justifyContent="space-between"
                    cursor="pointer"
                    m="auto"
                    onClick={() =>
                      downloadFile({
                        path: url + file.attributes.url,
                        name: file.attributes.name,
                        extension: file.attributes.ext
                      })
                    }>
                    <FiDownload mr="auto" />
                    <a
                      href={url + file.attributes.url}
                      target="_blank"
                      rel="noreferrer"
                      h="150px"
                      ml="auto"
                      d="block">
                      <TiEyeOutline />
                    </a>
                  </Flex>
                </Box>
              ))}
            </Flex>
            {currentUser?.role === projectManager && (
              <Link as={ReactLink} to={`edit-note`} d="block" m="auto">
                <Button colorScheme="purple" d="block" m="auto" variant="submitButton">
                  Edit Note
                </Button>
              </Link>
            )}
          </NoteBox>
        </Box>
      ) : (
        <Center h="60vh">
          <Spinner />
        </Center>
      )}

      {galleryVisible && (
        <Box h="100%" position="fixed" w="100%" top="0" left="0" background="#010614b3"></Box>
      )}

      {galleryVisible && (
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignContent={{ base: 'flex-start', lg: 'unset' }}
          width="100%"
          h={{ base: '100%', lg: '100vh' }}
          position={{ base: 'absolute', lg: 'fixed' }}
          top="0"
          left="0">
          <CloseButton
            onClick={() => setGalleryVisible(false)}
            color="white"
            fontWeight="800"
            m="3vw"
            ml="auto"
            cursor="pointer"
          />
          <Flex width="100%" justifyContent="center">
            {filesArray?.length && (
              <Center width={{ base: '80vw', lg: '800px' }} height={{ base: '80vw', lg: '600px' }}>
                {filesArray[counter].file?.attributes?.mime?.split('/')[0] === 'image' && (
                  <Image
                    src={url + filesArray[counter].file?.attributes.url}
                    height="auto"
                    width="100%"
                  />
                )}
                {filesArray[counter].file?.attributes?.mime?.split('/')[0] === 'text' && (
                  <DisplayText url={url + filesArray[counter].file?.attributes.url} />
                )}
                {filesArray[counter].file?.attributes?.mime?.split('/')[0] === 'video' && (
                  <Center background="white" w="100%" h="100%">
                    No Preview Avalailable <br />
                    click on view button in the items list
                  </Center>
                )}
              </Center>
            )}
          </Flex>
          <Flex
            width="100%"
            justifyContent="center"
            alignItems="center"
            mt={{ lg: '-20vh' }}
            flexWrap="wrap">
            <Center h="200px" order="1" width={{ base: '50%', lg: 'unset' }}>
              <MdOutlineArrowBackIos color="white" cursor="pointer" onClick={(e) => moveLeft(e)} />
            </Center>
            {filesArray?.map((file, i) => (
              <Box
                order={{ base: '3', lg: '2' }}
                key={file.file.id}
                index={i}
                mr="10px"
                ml="10px"
                onClick={() => openGallery(i)}
                border={activeItem?.file?.id === file?.file?.id && '2px solid teal'}>
                <Box h={{ base: '40vw', lg: '150px' }} width={{ base: '40vw', lg: '150px' }}>
                  <Center
                    h={{ base: '40vw', lg: '150px' }}
                    width={{ base: '40vw', lg: '150px' }}
                    border={file.active && '1px solid lightgray'}
                    p="30px">
                    {file.file.attributes.mime?.split('/')[0] === 'image' ? (
                      <Image src={url + file.file.attributes.url} height="auto" width="100%" />
                    ) : (
                      <Flex>
                        <NoteIcon files="[file]" height="auto" width="100" />
                      </Flex>
                    )}
                  </Center>
                </Box>
              </Box>
            ))}
            <Center h="200px" order={{ base: '2', lg: '3' }} width={{ base: '50%', lg: 'unset' }}>
              <MdOutlineArrowForwardIos
                color="white"
                cursor="pointer"
                onClick={(e) => moveRight(e)}
              />
            </Center>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default ViewNote
