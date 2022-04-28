import { Avatar, Flex, Heading, Text, Link, Button, Box } from '@chakra-ui/react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TiEyeOutline } from 'react-icons/ti'
import { RiEdit2Fill } from 'react-icons/ri'

import { authState } from 'features/auth/authSlice'
import { projectManager, url } from 'shared/constants'
import NoteIcon from './NoteIcon'

const Note = ({ data }) => {
  // const params = useParams()
  const navigate = useNavigate()

  const { currentUser } = useSelector(authState)
  let noteAuthor = data.attributes.author.data

  // go to the note page
  const viewNote = () => {
    navigate('note/' + data.id)
  }

  return (
    <Flex
      padding="1.8rem 1rem"
      d
      bgColor="white"
      borderRadius="0.4rem"
      maxW="420px"
      flexDirection="column"
      gap="0.7rem"
      width={{ base: '100%', md: '45%', lg: '300px' }}
      position="relative"
      boxShadow="5px 5px 8px 0 gray"
      _hover={{ boxShadow: '5px 5px 8px 0 #afabab' }}
      transition="0.3s"
      p="6"
      rounded="md">
      <Link
        as={ReactLink}
        to={`note/${data.id}`}
        _hover={{ textDecoration: 'none' }}
        position="absolute"
        top="2"
        left="2">
        <Button leftIcon={<TiEyeOutline />} variant="outline" size="xs">
          VIEW NOTE
        </Button>
      </Link>
      {currentUser.role === projectManager && (
        <Link
          as={ReactLink}
          to={`note/${data.id}/edit-note`}
          _hover={{ textDecoration: 'none' }}
          position="absolute"
          top="2"
          right="2">
          <Button leftIcon={<RiEdit2Fill />} variant="outline" size="xs">
            EDIT
          </Button>
        </Link>
      )}
      <Box onClick={viewNote} cursor={'pointer'} mt={'10px'}>
        <Heading as="h4" fontSize={['lg', 'xl']}>
          {data.attributes.title}
        </Heading>
        <Text color="#717171">{data.attributes.description}</Text>
        <Flex>
          <Flex gap="0.4rem" w="100%">
            <Flex mr="auto" alignItems="center">
              <NoteIcon files={data?.attributes?.files?.data} />
            </Flex>
            <Flex ml="auto" alignItems="center">
              <Avatar
                size="sm"
                name={noteAuthor?.attributes.username}
                src={`${url}${noteAuthor?.attributes?.userPhoto?.data?.attributes?.url}`}
              />
              <Heading as="h4" ml="10px" fontSize="14px">
                {noteAuthor?.attributes?.username}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Note
