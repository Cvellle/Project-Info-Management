import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Container,
  VStack,
  Box
} from '@chakra-ui/react'
import { useWillUnmount } from 'hooks/useWillUnmount'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateMeAPI } from '../api/updateMeAPI'
import { editUser, emptySelectedUser } from '../accountSlice'
import { authState, getMeAsync } from 'features/auth/authSlice'
import { PageDescription } from 'components/PageDescription'
import rocket from 'assets/rocket.png'

export function Account() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authSelector = useSelector(authState)
  const { currentUser } = authSelector

  const emptyUserFunction = () => {
    dispatch(emptySelectedUser())
  }

  useWillUnmount(emptyUserFunction)

  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    let dataBody = {
      data: { ...data }
    }

    const res = await updateMeAPI(currentUser.id, dataBody)
    if (res && !res.error) {
      let editRes = await dispatch(editUser(data))
      editRes && dispatch(getMeAsync())
      editRes && navigate('/', { replace: true })
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <Box>
      <PageDescription title="Account" text="Edit your own profile" image={rocket} />
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
                defaultValue={currentUser?.username ?? ''}
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
                defaultValue={currentUser?.email ?? ''}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            {registrationError && <Box color="red.500">{registrationError}</Box>}
          </VStack>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
            Update User
          </Button>
        </form>
      </Container>
    </Box>
  )
}
