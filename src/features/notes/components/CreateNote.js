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
  VStack,
  Link,
  Center
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, NavLink } from 'react-router-dom'

import { PageDescription } from 'components/PageDescription'
import rocket from '../../../assets/rocket.png'
import { MdOpenInNew } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { getCatgoriesAsync, getProjectAsync, notesState, postCategoryAsync } from '../notesSlice'
import { createNoteAPI } from '../api/createNoteAPI'
import { uploadFilesAPI } from '../api/uploadFilesAPI'
import { ModalComponent } from 'components/UI/ModalComponent'
import FormTextarea from 'components/UI/FormTextarea'

export function CreateNote() {
  // react-hooks-form
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()
  // additional hooks
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  // selectors
  const notesSelector = useSelector(notesState)
  // states from store
  const { selectedProject, categories } = notesSelector
  // local states
  const [isOpen, setIsOpen] = useState(false)
  const [registrationError, setRegistrationError] = useState(false)
  const [newCategory, setNewCategory] = useState()

  let files = watch('files')

  const previewFiles = () => {
    const filesArr = Object.values(files)
    return filesArr.map((file) => (
      <Text
        key={file.name}
        gap="0.5rem"
        alignItems="center"
        bgColor="#ede7fd"
        width="fit-content"
        padding="0.1rem 0.5rem"
        marginBottom="0.5rem"
        borderRadius="0.2rem">
        {file.name}
      </Text>
    ))
  }

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
  }, [])

  const setIsOpenFunction = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const setNewCategoryFunction = (e) => {
    setNewCategory(e.target.value)
  }

  const postNewCategory = async () => {
    let response = await dispatch(
      postCategoryAsync({
        data: {
          name: newCategory
        }
      })
    )
    if (response && !response.error) {
      let newOptionRes = await dispatch(getCatgoriesAsync())
      newOptionRes && !newOptionRes.erros && setValue('category', newCategory)
      newOptionRes && !newOptionRes.erros && setIsOpen(false)
    }
  }

  const onSubmit = async (data) => {
    // create body object
    let dataBody = {
      ...data,
      files: null,
      category: categories.data.find((el) => el?.attributes?.name == data.category).id,
      project: params.id,
      author: selectedProject?.attributes?.project_manager?.data?.id
    }

    // check if file input is not empty, and spread body object
    let files = []
    if (data.files.length) {
      for (const file in data.files) {
        if (typeof data.files[file] === 'object') {
          const fileId = await uploadFilesAPI(data.files[file])
          if (fileId) {
            files.push(fileId)
          }
        }
      }
      if (files.length > 0) {
        dataBody = { ...dataBody, files }
      }
    }

    // if success, navigate to the project page
    const res = await createNoteAPI(dataBody)
    if (res && !res.error) {
      navigate('/project/' + params.id, { replace: true })
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
        <Flex bgColor="#EAEAEA" color="#8E8E8E" alignItems="center" minH="75px" flexWrap="wrap">
          <Link
            as={NavLink}
            to={`/project/${params.id}`}
            width={{ base: '100%', md: 'auto' }}
            padding={{ base: '5px', md: 'none' }}>
            <Button bgColor="#EAEAEA" color="black" fontWeight="600">
              {'< Go back'}
            </Button>
          </Link>
          <Heading
            as="h4"
            fontSize={{ base: '20px', lg: '24px' }}
            color="black"
            width={{ base: '100%', md: 'auto' }}
            padding={{ base: '15px', md: 'none' }}
            textAlign="center">
            Create a new Note
          </Heading>
        </Flex>
        <Flex
          padding={{ base: '20px', md: 'none' }}
          pl={{ base: '20px', md: '45px' }}
          flexWrap={'wrap'}
          margin={{ base: '0', md: '49px 0' }}
          justifyContent={{ base: 'center', md: 'unset' }}>
          <Heading as="h5" fontSize={['sm', 'lg', 'xl']}>
            Note info
          </Heading>
          <Flex
            pl={{ base: '0', md: '84px' }}
            justifyContent={{ base: 'center', md: 'auto' }}
            w={{ base: '100%', md: 'auto' }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              w={{ base: '100vw', lg: '624px' }}
              d="flex"
              flex-wrap="wrap"
              margin={'auto'}>
              <VStack spacing="3.5">
                <FormControl isInvalid={errors.username} isRequired>
                  <FormLabel htmlFor="title" padding="0" margin="0">
                    Note title
                  </FormLabel>
                  <Input
                    w={{ base: 'auto', md: '624px' }}
                    id="title"
                    placeholder="Add title"
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
                  <FormTextarea
                    label="Note Description"
                    name="description"
                    register={register}
                    // defaultValue={defValues?.description}
                    w={{ base: 'auto', md: '624px' }}
                    id="description"
                    placeholder="Add description"
                    // minLength: { value: 4, message: 'Minimum length should be 4' }
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
                    name="category"
                    autoComplete="current-category"
                    isInvalid={errors.category}
                    defaultValue={''}>
                    <option value="" hidden></option>
                    {categories?.data?.map((note) => {
                      let noteAttr = note.attributes
                      return (
                        <option key={note.id} value={noteAttr.name}>
                          {noteAttr.name}
                        </option>
                      )
                    })}
                  </Select>
                  <Center
                    cursor="pointer"
                    onClick={setIsOpenFunction}
                    background="teal"
                    borderRadius="50%"
                    d="inline-flex"
                    height="35px"
                    width="35px"
                    mt="20px">
                    <Box>+</Box>
                  </Center>
                  <Center d="inline-flex" opacity="0.8" ml="10px">
                    Add new category
                  </Center>
                </FormControl>

                <FormControl position={'relative'} isInvalid={errors.files}>
                  <Box
                    bgColor="#EAEAEA"
                    _active={{ bg: 'gray' }}
                    _hover={{ bg: 'lightblue' }}
                    transition="0.3s"
                    cursor="pointer"
                    width="180px"
                    padding="0"
                    borderRadius="10px">
                    <FormLabel
                      htmlFor="files"
                      width="100%"
                      height="100%"
                      textAlign="center"
                      cursor="pointer"
                      fontWeight="bold"
                      margin="0"
                      padding="0.7rem">
                      Upload files
                    </FormLabel>
                  </Box>

                  <Input
                    id="files"
                    multiple
                    type="file"
                    {...register('files')}
                    accept={
                      'image/*,video/*,audio/*,.pdf,.txt,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    }
                    opacity="0"
                    zIndex="-5"
                  />
                  {files?.length > 0 && (
                    <Flex flexWrap="wrap" gap="1rem" maxWidth="70%">
                      {previewFiles()}
                    </Flex>
                  )}
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
                mr={{ base: 'auto', lg: '-191px' }}
                mb={{ base: '50px', md: '0' }}>
                SAVE NOTE
              </Button>
            </form>
          </Flex>
        </Flex>
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title="Add Category"
        confirmText="Submit"
        action={postNewCategory}>
        <Box position="absolute">
          <Input
            placeholder="Add new category"
            size="sm"
            bgColor="#ffff"
            name="addCategory"
            onChange={(e) => setNewCategoryFunction(e)}
          />
        </Box>
      </ModalComponent>
    </>
  )
}
