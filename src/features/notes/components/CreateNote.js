import {
  Flex,
  IconButton,
  Text,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Select,
  Box,
  VStack
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import { MdOpenInNew } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { getCatgoriesAsync, getProjectAsync, notesState } from '../notesSlice'
import { createNoteAPI } from '../api/createNoteAPI'
import { uploadFilesAPI } from '../api/uploadFilesAPI'

export function CreateNote() {
  // react-hooks-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  // additional hooks
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  // selectors
  const notesSelector = useSelector(notesState)
  // states from store
  const { notes, selectedProject, categories } = notesSelector

  useEffect(() => {
    dispatch(getCatgoriesAsync())
    dispatch(getProjectAsync(params.id))
  }, [])

  // input overlay click
  const hiddenFileInput = useRef(null)
  console.log(hiddenFileInput)

  // const handleClick = () => {
  //   hiddenFileInput.current.click()
  // }

  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    // create body object
    let dataBody = {
      ...data,
      category: categories.data.find((el) => el?.attributes?.name == data.category).id,
      project: selectedProject?.id,
      author: selectedProject?.attributes?.project_manager?.data?.id
    }

    // check if file input is not empty, and spread body object
    if (data.files.length) {
      const filesId = await uploadFilesAPI(data.files[0])
      filesId &&
        (dataBody = {
          ...dataBody,
          files: { id: filesId }
        })
    }

    // if success, navigate to the project page
    const res = await createNoteAPI(dataBody)
    if (res && !res.error) {
      navigate('project/' + params.id, { replace: true })
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <>
      <PageDescription
        title={
          <Flex gap="1rem">
            {selectedProject?.attributes?.name}
            <Flex alignItems="center">
              <IconButton icon={<MdOpenInNew />} fontSize="md" bgColor="transparent" size="xs" />
              <Text color="gray.600" fontSize="sm">
                EDIT
              </Text>
            </Flex>
          </Flex>
        }
        text={selectedProject?.attributes?.description}
        image={rocket}></PageDescription>
      <Box margin={{ base: '0', md: '2rem auto' }} maxW="1280px">
        <Flex bgColor="#EAEAEA" color="#8E8E8E" alignItems="center" minH="75px">
          <Button bgColor="#EAEAEA" color="black">
            {'< Go back'}
          </Button>
          <Heading as="h4" fontSize={['sm', '24px']} fontWeight="600" color="black">
            Create a new Note
          </Heading>
        </Flex>
        <Flex
          pl={{ base: '0', md: '45px' }}
          flexWrap={'wrap'}
          margin={{ base: '0', md: '49px 0' }}
          justifyContent={{ base: 'center', md: 'unset' }}>
          <Heading as="h5" fontSize={['sm', 'lg', 'xl']}>
            Note info
          </Heading>
          <Flex
            pl={{ base: '0', md: '-84px' }}
            justifyContent={{ md: 'center' }}
            w={{ base: '100%', md: 'auto' }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              w={{ base: '100vw', md: '624px' }}
              d="flex"
              flex-wrap="wrap"
              m="auto">
              <VStack spacing="3.5">
                <FormControl isInvalid={errors.username} isRequired>
                  <FormLabel htmlFor="title" padding="0" margin="0">
                    Note title
                  </FormLabel>
                  <Input
                    w={{ base: 'auto', md: '624px' }}
                    id="title"
                    placeholder="Hello"
                    autoComplete="title"
                    {...register('title', {
                      required: 'This is required'
                      // minLength: { value: 4, message: 'Minimum length should be 4' }
                    })}
                    defaultValue={''}
                  />
                  <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description} isRequired>
                  <FormLabel htmlFor="description" padding="0" margin="0">
                    Note description
                  </FormLabel>
                  <Input
                    w={{ base: 'auto', md: '624px' }}
                    id="description"
                    placeholder="Hello"
                    autoComplete="description"
                    {...register('description', {
                      required: 'This is required'
                      // minLength: { value: 4, message: 'Minimum length should be 4' }
                    })}
                    defaultValue={''}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.category} isRequired>
                  <FormLabel htmlFor="category" padding="0" margin="0">
                    Category
                  </FormLabel>
                  <Select
                    {...register('category')}
                    autoComplete="current-category"
                    isInvalid={errors.category}
                    defaultValue={''}>
                    <option value="" hidden></option>
                    {notes?.data?.map((note) => {
                      let noteAttr = note.attributes
                      return (
                        <option key={note.id} value={noteAttr.name}>
                          {noteAttr.name}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  position={'relative'}
                  h="50px"
                  w="100%"
                  d="block"
                  isInvalid={errors.files}
                  mr="auto">
                  <Box w="180px" cursor="pointer">
                    <Input
                      type="file"
                      {...register('files')}
                      accept={
                        'image/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      }
                      // ref={hiddenFileInput}
                      // placeholder="Choose Files"
                      // t="0"
                      // l="0"
                      // position={'absolute'}
                      // zIndex="2"
                      // opacity="0"
                      // cursor="pointer"
                      // w="0px"
                      // h="0%"
                    />
                    {/* <Button
                      onClick={handleClick}
                      position={'absolute'}
                      w="180px"
                      h="100%"
                      bgColor="#EAEAEA"
                      t="0"
                      l="0">
                      Upload files
                    </Button> */}
                  </Box>
                  <FormErrorMessage>{errors.files && errors.files.message}</FormErrorMessage>
                </FormControl>

                {registrationError && <Box color="red.500">{registrationError}</Box>}
              </VStack>
              <Button
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                width="149px"
                h="49px"
                d="block"
                mt="6"
                ml="auto"
                mr={{ base: '0', md: '-191px' }}>
                SAVE NOTE
              </Button>
            </form>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
