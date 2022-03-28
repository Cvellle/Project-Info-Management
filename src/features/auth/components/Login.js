import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Container,
  VStack,
  Box,
  Link
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginAsync } from '../authSlice'
import { Link as ReactLink, useNavigate } from 'react-router-dom'

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState()
  const [loginError, setLoginError] = useState(false)

  const onSubmit = async (data) => {
    const flag = true
    const res = await dispatch(loginAsync(data, flag))
    if (res && !res.error) {
      navigate('/', { replace: true })
      localStorage.setItem('token', res.payload.jwt)
    }
    if (res.error) {
      setLoginError(res.error.message)
    }
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Container paddingTop="3rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3.5">
          <FormControl isInvalid={errors.email} isRequired>
            <FormLabel htmlFor="email" padding="0" margin="0">
              Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Your Email"
              autoComplete="email"
              {...register('identifier', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} isRequired>
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
                  minLength: { value: 8, message: 'Minimum length should be 8' }
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          {loginError && <Box color="red.500">{loginError}</Box>}
        </VStack>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
          Submit
        </Button>
      </form>
      <Box my="3">
        <Link as={ReactLink} to="/register">
          Don&apos;t have an account yet? Sign Up
        </Link>
      </Box>
    </Container>
  )
}
