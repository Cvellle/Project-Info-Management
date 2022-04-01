import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  // InputGroup,
  // InputRightElement,
  Container,
  VStack,
  Box
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneUserAsync, selectUsers, updateUserUsersAssync } from '../usersSlice'

export function EditUser() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
    // setValue
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const selectedUser = useSelector(selectUsers).selectedUser

  useEffect(() => {
    dispatch(getOneUserAsync(params.id))
  }, [])

  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    console.log(data)
    // try {

    // } catch (ex) {
    //   throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
    // }

    const res = await dispatch(updateUserUsersAssync(params.id, data))
    if (res && !res.error) {
      dispatch(updateUserUsersAssync(params.id, data))
      navigate('/login', { replace: true })
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <Container paddingTop="3rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3.5">
          <FormControl isInvalid={errors.username} isRequired>
            <FormLabel htmlFor="username" padding="0" margin="0">
              Username
            </FormLabel>
            <Input
              id="username"
              placeholder="Your Username"
              autoComplete="username"
              {...register('username', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
              defaultValue={selectedUser?.username ?? ''}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} isRequired>
            <FormLabel htmlFor="email" padding="0" margin="0">
              Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Your Email"
              autoComplete="email"
              {...register('email', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
              defaultValue={selectedUser?.email ?? ''}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.role} isRequired>
            <FormLabel htmlFor="role" padding="0" margin="0">
              Role
            </FormLabel>
            <Input
              id="role"
              placeholder="Your Email"
              autoComplete="current-role"
              {...register('role', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
              defaultValue={selectedUser?.role ?? ''}
            />
            <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
          </FormControl>
          {registrationError && <Box color="red.500">{registrationError}</Box>}
        </VStack>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
          Update User
        </Button>
      </form>
    </Container>
  )
}
