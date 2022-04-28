import {
  Flex,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Select,
  Box,
  VStack,
  Center,
  Textarea
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  emptyProject,
  getCatgoriesAsync,
  getProjectAsync,
  notesState,
  postCategoryAsync
} from '../notesSlice'
import { ModalComponent } from 'components/UI/ModalComponent'
import { method } from '../method'
import PreviewFiles from './PreviewFiles'

const NoteForm = ({ defaultValues, uploadedFiles, buttonText, action }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const notesSelector = useSelector(notesState)
  const { selectedProject, categories } = notesSelector
  const [isOpen, setIsOpen] = useState(false)
  const [registrationError, setRegistrationError] = useState(false)
  const [newCategory, setNewCategory] = useState()

  let files = watch('files')

  useEffect(() => {
    dispatch(getProjectAsync(params.id))

    return () => {
      dispatch(emptyProject())
    }
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
      newOptionRes && !newOptionRes.error && setValue('category', response.payload.id)
      newOptionRes && !newOptionRes.error && setIsOpen(false)
    }
  }

  const onSubmit = async (data) => {
    const res = await method({
      noteId: params.noteId,
      data,
      action,
      files,
      authorId: selectedProject?.attributes?.project_manager?.data?.id,
      projectId: params.id
    })

    if (res && !res.error) {
      navigate('/project/' + params.id, { replace: true })
    } else {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <>
      <Flex
        padding={{ base: '20px', md: 'none' }}
        pl={{ base: '20px', md: '0', lg: '45px' }}
        flexWrap={'wrap'}
        margin={{ base: '0', md: '49px 0' }}
        justifyContent={{ base: 'center', lg: 'unset' }}>
        <Heading as="h5" fontSize={['sm', 'lg', 'xl']} w={{ base: '100%', lg: 'unset' }}>
          Note info
        </Heading>
        <Flex
          pl={{ base: '0', lg: '84px' }}
          justifyContent={{ base: 'center', md: 'auto' }}
          w={{ base: '100%', md: 'auto' }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            w={{ base: '100vw', md: '624px' }}
            d="flex"
            flex-wrap="wrap"
            margin={'auto'}>
            <VStack spacing="3.5" alignItems="flex-start" mt={{ base: '30px', lg: '0' }}>
              <FormControl isInvalid={errors.username} isRequired>
                <FormLabel htmlFor="title" padding="0" margin="0">
                  Note title
                </FormLabel>
                <Input
                  w={{ base: '100%', md: '624px' }}
                  id="title"
                  placeholder="Hello"
                  autoComplete="title"
                  {...register('title', {
                    required: 'This is required'
                  })}
                  defaultValue={defaultValues?.title}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} isRequired>
                <FormLabel htmlFor="description" padding="0" margin="0">
                  Note description
                </FormLabel>
                <Textarea
                  w={{ base: '100%', md: '624px' }}
                  id="description"
                  placeholder="Hello"
                  autoComplete="description"
                  {...register('description', {
                    required: 'This is required'
                  })}
                  defaultValue={defaultValues?.description}
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
                  id="category"
                  name="category"
                  autoComplete="current-category"
                  isInvalid={errors.category}
                  defaultValue={defaultValues !== null ? defaultValues?.category?.data?.id : ' '}>
                  {categories?.data?.map((category) => {
                    let categoryAttr = category?.attributes
                    return (
                      <option key={category.id} value={category.id}>
                        {categoryAttr.name}
                      </option>
                    )
                  })}
                  {defaultValues === null && <option value={' '} hidden></option>}
                </Select>
                <Center
                  cursor="pointer"
                  onClick={setIsOpenFunction}
                  background="#805ad5"
                  _hover={{ background: '#805ad5a8' }}
                  color="white"
                  transition="0.3s"
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
                <Box bgColor="#EAEAEA" cursor="pointer" width="180px" padding="0" mt="30px">
                  <FormLabel
                    htmlFor="files"
                    width="100%"
                    height="100%"
                    textAlign="center"
                    cursor="pointer"
                    fontWeight="bold"
                    margin="0"
                    padding="0.7rem">
                    {buttonText}
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
                    <PreviewFiles files={files} />
                  </Flex>
                )}
                <FormErrorMessage>{errors.files && errors.files.message}</FormErrorMessage>
              </FormControl>

              {uploadedFiles}

              {registrationError && <Box color="red.500">{registrationError}</Box>}
            </VStack>
            <Button
              colorScheme="purple"
              isLoading={isSubmitting}
              type="submit"
              width="149px"
              h="49px"
              d="block"
              mt="6"
              ml="auto"
              mr={{ base: 'auto', md: 'auto', lg: '-191px' }}
              mb={{ base: '50px', md: '0' }}>
              SAVE NOTE
            </Button>
          </form>
        </Flex>
      </Flex>

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title="Add Category"
        confirmText="Submit"
        action={postNewCategory}>
        <Box my="0px">
          <Input
            placeholder="Add new category"
            size="sm"
            w="100%"
            bgColor="#ffff"
            name="addCategory"
            onChange={(e) => setNewCategoryFunction(e)}
          />
        </Box>
      </ModalComponent>
    </>
  )
}

export default NoteForm
