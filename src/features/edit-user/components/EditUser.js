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
import { selectUsers } from '../usersSlice'

export function EditUser() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentUser, setCurrentUser] = useState({})

  const usersSelector = useSelector(selectUsers)
  const params = useParams()

  useEffect(() => {
    let current = usersSelector.users[params.id - 1]
    setCurrentUser({
      ...currentUser,
      id: current.id,
      username: current.username,
      email: current.email,
      role: current.role,
      blocked: current.blocked,
      confirmed: current.confirmed
    })
  }, [])

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  // const [showPassword, setShowPassword] = useState()
  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    console.log(data)

    // updateUserUsersAssync()

    const res = await dispatch()
    if (res && !res.error) {
      navigate('/login', { replace: true })
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  // const handleShowPassword = () => {
  //   setShowPassword((prev) => !prev)
  // }

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
              defaultValue={currentUser.username ?? ''}
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
              defaultValue={currentUser.email ?? ''}
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
              defaultValue={currentUser?.role?.name ?? ''}
            />
            <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
          </FormControl>

          {/* <FormControl isInvalid={errors.password} isRequired>
            <FormLabel htmlFor="password" padding="0" margin="0">
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your Password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'This is required',
                  minLength: { value: 2, message: 'Minimum length should be 8' }
                })}
                value={currentUser.password ?? ''}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl> */}

          {registrationError && <Box color="red.500">{registrationError}</Box>}
        </VStack>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
          Update User
        </Button>
      </form>
    </Container>
  )
}
