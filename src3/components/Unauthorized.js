import { Center, Flex, Heading } from '@chakra-ui/react'

export const Unauthorized = () => {
  return (
    <Center>
      <Flex justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
        <Heading as="h1" size="md">
          You are not authorized!
        </Heading>
      </Flex>
    </Center>
  )
}
