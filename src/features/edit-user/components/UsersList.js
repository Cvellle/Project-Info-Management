import { Flex, Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRolesAsync, getUsersAsync, selectUsers } from '../usersSlice'
import { UserItem } from './UserItem'
import rocket from 'assets/rocket.png'
import { PageDescription } from 'components/PageDescription'

export function UsersList() {
  const dispatch = useDispatch()
  const usersSelector = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsersAsync())
    dispatch(getRolesAsync())
  }, [])

  return (
    <Box>
      <PageDescription title="Users list" text="Edit existing users" image={rocket} />
      <Box m="auto" w={{ base: '100%', md: '70%' }}>
        <Flex flexWrap="wrap" m="31px auto">
          {usersSelector?.users?.map((project) => {
            return <UserItem item={project} key={project.id} />
          })}
        </Flex>
      </Box>
    </Box>
  )
}
