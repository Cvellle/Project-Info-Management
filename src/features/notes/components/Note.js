import { Avatar, Flex, Heading, Text, Link, Button } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { DiReact } from 'react-icons/di'
import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'

const Note = ({ data }) => {
  const url = process.env.REACT_APP_BACKEND_URL

  const { currentUser } = useSelector(authState)

  return (
    <Flex
      padding="1.8rem 1rem"
      bgColor="white"
      borderRadius="0.4rem"
      minW="300px"
      maxW="420px"
      flexDirection="column"
      gap="0.7rem"
      width={{ base: '100%', md: 'fit-content' }}
      position="relative">
      {currentUser.role === projectManager && (
        <Link
          as={ReactLink}
          to={`notes/${data.id}/edit`}
          _hover={{ textDecoration: 'none' }}
          position="absolute"
          top="2"
          right="2">
          <Button leftIcon={<DiReact />} variant="outline" size="xs">
            EDIT
          </Button>
        </Link>
      )}
      <Heading as="h4" fontSize={['lg', 'xl']}>
        {data.attributes.title}
      </Heading>
      <Text color="#717171">{data.attributes.description}</Text>
      <Flex>
        <Flex alignItems="center" gap="0.4rem">
          <Avatar
            name={data.attributes.author.data.attributes.username}
            src={`${url}${data.attributes.author.data.attributes?.userPhoto?.url}`}
          />
          <Heading as="h4" fontSize={['md', 'lg']}>
            {data.attributes.author.data.attributes.username}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Note
