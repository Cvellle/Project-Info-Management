import { Text, Center, Heading, Image, Flex } from '@chakra-ui/react'

export function Info({ title, text, image }) {
  return (
    <Flex alignItems="center" gap="1rem" flexDirection={{ base: 'column', md: 'row' }}>
      <Image
        objectFit="contain"
        alt="employee"
        src={image}
        boxSize={{ base: '100px', lg: '75px' }}
        fallbackSrc="https://via.placeholder.com/150"
        borderRadius="50%"
      />
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
