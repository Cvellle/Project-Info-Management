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
  Textarea,
  Image
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  getCatgoriesAsync,
  getProjectAsync,
  notesState,
  postCategoryAsync,
  setnoteFormDisabled
} from '../notesSlice'
import { ModalComponent } from 'components/UI/ModalComponent'
import { method } from '../method'
import UploadedFiles from 'components/UI/UploadedFiles'
import PreviewFiles from './PreviewFiles'
import NoteIcon from './NoteIcon'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'

const NoteForm = ({ defaultValues, buttonText, action, disabledProp }) => {
  const url = process.env.REACT_APP_BACKEND_URL

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()
  // hooks
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  // states
  const notesSelector = useSelector(notesState)
  const { currentUser } = useSelector(authState)
  const { selectedProject, categories, oneNoteStatus } = notesSelector
  const [isOpen, setIsOpen] = useState(false)
  const [formDisabled, setFormDisabled] = useState(null)
  const [registrationError, setRegistrationError] = useState(false)
  const [newCategory, setNewCategory] = useState()

  let files = watch('files')

  useEffect(() => {
    disabledProp && setFormDisabled(disabledProp)
    dispatch(getProjectAsync(params.id))
    dispatch(setnoteFormDisabled(disabledProp))
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
      newOptionRes && !newOptionRes.error && setValue('category', newCategory)
      newOptionRes && !newOptionRes.error && setIsOpen(false)
    }
  }

  const startEdit = () => {
    navigate(`/project/${params.id}/notes/${params.noteId}/edit-note`)
    setValue('description', defaultValues.description)
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
      {currentUser?.role && oneNoteStatus !== 'pending' && formDisabled !== null && (
        <Box>
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
                w={{ base: '100vw', md: '624px' }}
                d="flex"
                flex-wrap="wrap"
                margin={'auto'}>
                <VStack spacing="3.5" alignItems="flex-start">
                  <FormControl isInvalid={errors.username} isRequired={!formDisabled}>
                    <FormLabel htmlFor="title" padding="0" margin="0">
                      Note title
                    </FormLabel>
                    <Input
                      disabled={formDisabled}
                      _disabled={{ opacity: 1, border: 'none' }}
                      w={{ base: 'auto', md: '624px' }}
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
                  <FormControl isInvalid={errors.description} isRequired={!formDisabled}>
                    <FormLabel htmlFor="description" padding="0" margin="0">
                      Note description
                    </FormLabel>
                    <Textarea
                      resize={formDisabled && 'none'}
                      disabled={formDisabled}
                      _disabled={{ opacity: 1, border: 'none' }}
                      w={{ base: 'auto', md: '624px' }}
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
                  <FormControl
                    isInvalid={errors.category}
                    isRequired={!formDisabled}
                    d="flex"
                    flexWrap="wrap">
                    <FormLabel htmlFor="category" padding="0" margin="0">
                      Category
                    </FormLabel>
                    <Select
                      disabled={formDisabled}
                      _disabled={{ opacity: 1, border: 'none' }}
                      {...register('category')}
                      name="category"
                      autoComplete="current-category"
                      isInvalid={errors.category}
                      defaultValue={defaultValues?.category?.data?.id || 1}>
                      {categories?.data?.map((note) => {
                        let noteAttr = note.attributes
                        return (
                          <option key={note.id} value={note.id}>
                            {noteAttr.name}
                          </option>
                        )
                      })}
                    </Select>
                    {formDisabled && (
                      <Box
                        background="white"
                        d="inline-flex"
                        height="35px"
                        width="35px"
                        ml="auto"
                        style={{ transform: `translate(${0}px, ${-100}%)` }}></Box>
                    )}
                    {!disabledProp && (
                      <Box>
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
                      </Box>
                    )}
                  </FormControl>

                  {!formDisabled && <UploadedFiles filesArray={defaultValues?.files?.data} />}

                  {formDisabled && (
                    <Flex flexWrap="wrap">
                      Files:
                      {defaultValues?.files?.data?.map((file) =>
                        file.attributes.mime?.split('/')[0] === 'image' ? (
                          <Center key={file.id} m="30px" h="200px">
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
                  )}

                  <FormControl position={'relative'} isInvalid={errors.files}>
                    {!formDisabled && (
                      <Box>
                        <Box bgColor="#EAEAEA" cursor="pointer" width="180px" padding="0">
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
                          disabled={formDisabled}
                          _disabled={{ opacity: 1, border: 'none' }}
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
                      </Box>
                    )}
                    {files?.length > 0 && (
                      <Flex flexWrap="wrap" gap="1rem" maxWidth="70%">
                        <PreviewFiles files={files} />
                      </Flex>
                    )}
                    <FormErrorMessage>{errors.files && errors.files.message}</FormErrorMessage>
                  </FormControl>

                  {registrationError && <Box color="red.500">{registrationError}</Box>}
                </VStack>
                {!formDisabled && currentUser?.role === projectManager ? (
                  <Button
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                    width="149px"
                    h="49px"
                    d="block"
                    mt="6"
                    ml="auto"
                    mr={{ base: 'auto', md: '0', lg: '-191px' }}
                    mb={{ base: '50px', md: '0' }}>
                    SAVE NOTE
                  </Button>
                ) : (
                  currentUser?.role === projectManager && (
                    <Button
                      colorScheme="teal"
                      onClick={startEdit}
                      width="149px"
                      h="49px"
                      d="block"
                      mt="6"
                      ml="auto"
                      mr={{ base: 'auto', md: '0', lg: '-191px' }}
                      mb={{ base: '50px', md: '0' }}>
                      EDIT NOTE
                    </Button>
                  )
                )}
              </form>
            </Flex>
          </Flex>

          {!disabledProp && (
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
          )}
        </Box>
      )}
    </>
  )
}

export default NoteForm
