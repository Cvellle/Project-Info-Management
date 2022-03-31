import { Flex, Box, Heading } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUsersAssync, selectUsers } from '../usersSlice'
import { UserItem } from './UserItem'

export function UsersList() {
  const dispatch = useDispatch()
  const usersSelector = useSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsersAssync())
  }, [])

  return (
    <Box m="auto" w={{ base: '100%', md: '70%' }}>
      <Heading
        as="h2"
        fontSize={['lg', 'xl']}
        paddingLeft={{ base: '85px', md: '85px', lg: '95px' }}
        fontWeight="extrabold">
        Users list
      </Heading>
      <Flex flexWrap="wrap" m="31px auto">
        {usersSelector?.users.map((project, i) => {
          return <UserItem item={project} key={i} />
        })}
      </Flex>
    </Box>
  )
}
