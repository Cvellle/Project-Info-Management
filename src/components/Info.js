import { Text, Center, Heading, Image, Flex, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

export function Info({ title, text, image, linkPath }) {
  return (
    <Flex alignItems="center" gap="1rem" flexDirection={{ base: 'column', md: 'row' }}>
      <Link as={ReactLink} to={linkPath}>
        <Image
          objectFit="contain"
          alt="employee"
          src={image}
          boxSize={{ base: '100px', lg: '75px' }}
          fallbackSrc="https://via.placeholder.com/150"
          borderRadius="50%"
        />
      </Link>
      <Center>
        <Flex gap="0.4rem" flexDirection="column">
          <Heading as="h2" fontSize="xl" textAlign={{ base: 'center', md: 'start' }}>
            {title}
          </Heading>
          <Text fontSize={['sm', 'md']}>{text}</Text>
        </Flex>
      </Center>
    </Flex>
  )
}
