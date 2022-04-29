import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Container,
  VStack,
  Box,
  Avatar,
  Spinner,
  Center
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { updateMeAPI } from '../api/updateMeAPI'

import { accountState, emptySelectedUser, getMeAsync } from '../accountSlice'
import { PageDescription } from 'components/PageDescription'
import rocket from 'assets/rocket.png'
import FileInput from 'components/UI/FileInput'
import { uploadProfileImageAPI } from '../api/uploadProfileImageAPI'
import { url } from 'shared/constants'

export function Account() {
  const accountSelector = useSelector(accountState)
  const { selectedUser } = accountSelector

  useEffect(() => {
    dispatch(getMeAsync())

    return () => {
      dispatch(emptySelectedUser())
    }
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const dispatch = useDispatch()
  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    let dataBody = {
      data: { ...data }
    }
    // check if file input is not empty, and spread body object
    if (data.logo.length) {
      const logoId = await uploadProfileImageAPI(data.logo[0])
      dataBody = {
        data: { ...data, userPhoto: { id: logoId } }
      }
    }
    // final update api call
    const res = await updateMeAPI(selectedUser.id, dataBody)
    if (res && !res.error) {
      dispatch(getMeAsync())
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <>
      {selectedUser?.userPhoto ?? selectedUser?.role !== '' ? (
        <Box>
          <PageDescription title="Account" text="Edit your own profile" image={rocket} />
          <Container paddingTop="3rem">
            <Avatar
              name={selectedUser.userName}
              src={`${url}${selectedUser?.userPhoto?.url}`}
              m="10px auto"
              h="200px"
              w="200px"
              d="block"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing="3.5">
                <FormControl isInvalid={errors.logo}>
                  <FormLabel htmlFor="logo" padding="0" margin="0">
                    Logo
                  </FormLabel>
                  <FileInput
                    accept="image/*"
                    name="logo"
                    register={register}
                    requiredProp={false}
                    labelText="Upload Logo"
                    id="account-logo"
                    widthProp="180px"
                    borderRadius="15px"
                  />
                  <FormErrorMessage>{errors.logo && errors.logo.message}</FormErrorMessage>
                </FormControl>

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

                {registrationError && <Box color="red.500">{registrationError}</Box>}
              </VStack>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting}
                type="submit"
                width="100%"
                mt="6"
                mb="100px">
                Update User
              </Button>
            </form>
          </Container>
        </Box>
      ) : (
        <Center h="70vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  )
}
