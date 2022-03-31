import { Input, Flex, InputGroup, InputLeftElement, Link, Button } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'

import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'
import { Link as ReactLink } from 'react-router-dom'

export function Search() {
  const { currentUser } = useSelector(authState)

  return (
    <Flex justifyContent={{ base: 'center', md: 'flex-end' }} alignItems="center" gap="1rem">
      <InputGroup justifySelf="flex-end" width={{ base: '80%', md: '60%', lg: '50%' }}>
        <InputLeftElement pointerEvents="none" height="100%">
          <DiReact color="var(--chakra-colors-cyan-400)" />
        </InputLeftElement>
        <Input placeholder="Search projects" size="sm" bgColor="#ffff" width="100%" maxW="" />
      </InputGroup>

      {currentUser.role === projectManager && (
        <Link as={ReactLink} size="sm" to="/create-project" _hover={{ textDecoration: 'none' }}>
          <Button colorScheme="teal" fontWeight="medium" size="sm">
            New Project
          </Button>
        </Link>
      )}
    </Flex>
  )
}
