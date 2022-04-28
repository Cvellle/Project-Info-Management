import { Input, Flex, InputGroup, InputLeftElement, Link, Button } from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'
import { Link as ReactLink } from 'react-router-dom'

import { projectManager } from 'shared/constants'
import { setFilterBy } from '../dashboardSlice'

export function Search() {
  const { currentUser } = useSelector(authState)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setFilterBy(e.target.value))
  }

  return (
    <Flex justifyContent={{ base: 'center', md: 'flex-end' }} alignItems="center" gap="1rem">
      <InputGroup justifySelf="flex-end" width={{ base: '80%', md: '60%', lg: '50%' }}>
        <InputLeftElement pointerEvents="none" height="100%">
          <BiSearchAlt color="var(--chakra-colors-cyan-400)" />
        </InputLeftElement>
        <Input
          placeholder="Search projects"
          size="sm"
          bgColor="#ffff"
          width="100%"
          maxW=""
          onChange={(e) => handleChange(e)}
        />
      </InputGroup>

      {currentUser.role === projectManager && (
        <Link as={ReactLink} size="sm" to="/create-project" _hover={{ textDecoration: 'none' }}>
          <Button colorScheme="purple" fontWeight="medium" size="sm">
            New Project
          </Button>
        </Link>
      )}
    </Flex>
  )
}
