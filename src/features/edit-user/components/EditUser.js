import { Container, Spinner, Center } from '@chakra-ui/react'
import { useWillUnmount } from 'hooks/useWillUnmount'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { emptySelectedUser, selectUsers } from '../usersSlice'
import { getOneUserAsync } from '../usersSlice'
import { EditUserForm } from './EditUserForm'

export function EditUser() {
  const dispatch = useDispatch()
  const params = useParams()
  const selectedUser = useSelector(selectUsers).selectedUser
  const roles = useSelector(selectUsers).roles

  const [roleId, setRoleId] = useState()

  useEffect(() => {
    dispatch(getOneUserAsync(params.id))
  }, [])

  useEffect(() => {
    if (selectedUser?.role !== '') {
      const currentRoleObject = roles.find((roleObj) => roleObj.name == selectedUser.role)
      setRoleId(currentRoleObject?.id)
    }
  }, [selectedUser])

  const emptyUserFunction = () => {
    dispatch(emptySelectedUser())
  }

  useWillUnmount(emptyUserFunction)

  return (
    <Container paddingTop="3rem">
      {selectedUser?.role ? (
        <EditUserForm roleId={roleId} />
      ) : (
        <Center h="60vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )}
    </Container>
  )
}
