import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

const NoteBox = ({ title, children }) => {
  return (
    <Box margin={{ base: '0', md: '2rem auto' }} maxW="1280px">
      <Flex bgColor="#EAEAEA" color="#8E8E8E" alignItems="center" minH="75px" flexWrap="wrap">
        <Link
          as={ReactLink}
          to={-1}
          width={{ base: '100%', md: 'auto' }}
          padding={{ base: '5px', md: 'none' }}>
          <Button bgColor="#EAEAEA" color="black" fontWeight="600">
            {'< Go back'}
          </Button>
        </Link>
        <Heading
          as="h4"
          fontSize={{ base: '20px', lg: '24px' }}
          color="black"
          width={{ base: '100%', md: 'auto' }}
          padding={{ base: '15px', md: 'none' }}
          textAlign="center">
          {title}
        </Heading>
      </Flex>
      {children}
    </Box>
  )
}

export default NoteBox
