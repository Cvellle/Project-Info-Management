import { Center, Heading, Flex } from '@chakra-ui/react'

export const NotFound = () => {
  return (
    <Center>
      <Flex justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
        <Heading as="h1" size="md">
          Page Not Found!
        </Heading>
      </Flex>
    </Center>
  )
}
