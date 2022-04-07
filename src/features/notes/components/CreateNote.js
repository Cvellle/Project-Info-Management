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
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PageDescription } from 'components/PageDescription'
import { getProjectAsync } from '../projectSlice'
import rocket from '../../../assets/rocket.png'
import { MdOpenInNew } from 'react-icons/md'
import { selectedProject } from '../projectSlice'
import { useForm } from 'react-hook-form'

export function CreateNote() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  //   const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const project = useSelector(selectedProject)

  useEffect(() => {
    dispatch(getProjectAsync(params.id))
  }, [])

  const hiddenFileInput = useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  //   const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    console.log(data)
    // let dataBody = {
    //   data: { ...data, role: { id: roleId } }
    // }

    // const res = await updateUser(params.id, dataBody)
    // if (res && !res.error) {
    //   //   navigate('/', { replace: true })
    // }
    // if (res.error) {
    //   setRegistrationError(res.error.message)
    // }
  }

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
      <Box margin={{ base: '0', md: '2rem auto' }} maxW="1280px">
        <Flex bgColor="#EAEAEA" color="#8E8E8E" alignItems="center" minH="75px">
          <Button bgColor="#EAEAEA">{String.fromCharCode(8592)} Go back</Button>
          <Heading as="h4" fontSize={['sm', 'lg', 'xl']}>
            Create a new Note
          </Heading>
        </Flex>
        <Flex pl="45px" flexWrap={'wrap'}>
          <Heading as="h5" fontSize={['sm', 'lg', 'xl']}>
            Note info
          </Heading>
          <Flex pl="84px" justifyContent={{ md: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing="3.5">
                <FormControl isInvalid={errors.username} isRequired>
                  <FormLabel htmlFor="title" padding="0" margin="0">
                    Note title
                  </FormLabel>
                  <Input
                    id="title"
                    placeholder="Hello"
                    autoComplete="title"
                    {...register('title', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' }
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
                    id="description"
                    placeholder="Hello"
                    autoComplete="description"
                    {...register('description', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' }
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
                    defaultValue={''}
                    //   onChange={(e) => setCategoryFunction(e)}
                  >
                    {
                      //   categories &&
                      //     categories.map((category) => (
                      //       <option key={category.id} value={category.name}>
                      //         {category.name}
                      //       </option>
                      //     ))
                    }
                  </Select>
                </FormControl>

                <FormControl
                  isInvalid={errors.email}
                  isRequired
                  position={'relative'}
                  h="50px"
                  w="127px"
                  d="block"
                  cursor="pointer">
                  <Input
                    t="0"
                    l="0"
                    position={'absolute'}
                    zIndex="2"
                    opacity="0"
                    cursor="pointer"
                    w="100%"
                    h="100%"
                    id="files"
                    display="none"
                    placeholder="Upload files"
                    autoComplete="files"
                    type="file"
                    accept={'image/*'}
                    {...register('files', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' }
                    })}
                    defaultValue={''}
                    ref={hiddenFileInput}
                  />
                  <Button
                    onClick={handleClick}
                    position={'absolute'}
                    w="100%"
                    h="100%"
                    bgColor="#EAEAEA"
                    t="0"
                    l="0">
                    Upload files
                  </Button>
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                {/* {registrationError && <Box color="red.500">{registrationError} */}
              </VStack>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
                Update User
              </Button>
            </form>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
