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
  // const [direction, setDirection] = useState([])

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
      selectedNote?.attributes?.files?.data.map((el) => {
        return {
          file: el,
          active: false
        }
      })
    )
  }, [selectedNote])

  // useEffect(() => {
  //   let activatedItem = {
  //     file: filesArray[counter],
  //     active: true
  //   }
  //   setFilesArray(...filesArray.slice(0, counter - 1), activatedItem, ...filesArray.slice(counter))
  // }, [counter])

  const downloadFile = (passedProps) => {
    downloadFileAPI(passedProps)
  }

  // const remove = async () => {
  //   let a = await setFilesArray(filesArray.slice(1))
  //   return a
  // }

  // const add = async () => {
  //   let a = await setFilesArray([...filesArray, filesArray[0]])
  //   return a
  // }

  const moveLeft = async () => {
    // let a = await remove()
    // if (a) {
    //   console.log(filesArray)
    //   let b = await add
    //   if (b) {
    //     console.log(filesArray)
    // setCounter(counter - 1)
    // counter === 0 && setCounter(filesArray.length - 1)
    // }
    // }

    // let activatedItem = {
    //   file: filesArray[counter].file,
    //   active: false
    // }
    // setFilesArray(...filesArray.slice(0, counter - 1), activatedItem, ...filesArray.slice(counter))
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
    <>
      <Box>
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
                  <Button colorScheme="purple" d="block" m="auto">
                    EDIT NOTE
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
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            width="100%"
            h={{ base: '100%', lg: '100vh' }}
            background="#010614b3"
            position="fixed"
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
              <Center width={{ base: '80vw', lg: '800px' }} height={{ base: '80vw', lg: '600px' }}>
                {filesArray?.length &&
                  (filesArray[counter].file?.attributes?.mime?.split('/')[0] === 'image' ? (
                    <Image
                      src={url + filesArray[counter].file?.attributes.url}
                      height="auto"
                      width="100%"
                    />
                  ) : (
                    <DisplayText url={url + filesArray[counter].file?.attributes.url} />
                  ))}
              </Center>
            </Flex>
            <Flex width="100%" justifyContent="center" alignItems="center">
              <MdOutlineArrowBackIos cursor="pointer" onClick={(e) => moveLeft(e)} />
              {filesArray?.map((file, i) => (
                <Box
                  key={file.file.id}
                  index={i}
                  mr="10px"
                  ml="10px"
                  onClick={() => openGallery(i)}
                  border={'1px solid teal'}>
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
              <MdOutlineArrowForwardIos cursor="pointer" onClick={(e) => moveRight(e)} />
            </Flex>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default ViewNote
