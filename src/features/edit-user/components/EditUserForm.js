import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Select,
  Container,
  VStack,
  Box,
  Spinner,
  Center
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { updateUser } from '../api/updateUserAPI'
import { editUser, selectUsers } from '../usersSlice'

export function EditUserForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const selectedUser = useSelector(selectUsers).selectedUser
  const roles = useSelector(selectUsers).roles

  const [roleId, setRoleId] = useState()

  const setRoleFunction = (e) => {
    setRoleId(e.target.selectedIndex + 1)
  }

  const [registrationError, setRegistrationError] = useState(false)

  const onSubmit = async (data) => {
    let dataBody = {
      data: { ...data, role: { id: roleId } }
    }

    const res = await updateUser(params.id, dataBody)
    if (res && !res.error) {
      dispatch(editUser(data))
      navigate('/', { replace: true })
    }
    if (res.error) {
      setRegistrationError(res.error.message)
    }
  }

  return (
    <Container paddingTop="3rem">
      {selectedUser?.role ? (
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
              <Select
                {...register('role')}
                autoComplete="current-role"
                isInvalid={errors.role}
                defaultValue={selectedUser?.role ?? ''}
                onChange={(e) => setRoleFunction(e)}>
                {roles &&
                  roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name.replace('_', ' ')}
                    </option>
                  ))}
              </Select>
            </FormControl>

            {registrationError && <Box color="red.500">{registrationError}</Box>}
          </VStack>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit" width="100%" mt="6">
            Update User
          </Button>
        </form>
      ) : (
        <Center h="60vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )}
    </Container>
  )
}
