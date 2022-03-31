import { Text, Center, Heading, Image, Flex } from '@chakra-ui/react'
import rocketImage from 'assets/rocket.png'

export function Info(props) {
  return (
    <Flex alignItems="center" gap="1rem" flexDirection={{ base: 'column', md: 'row' }}>
      <Image
        objectFit="contain"
        alt="employee"
        src={rocketImage}
        boxSize={{ base: '60px', lg: '75px' }}
      />
      <Center>
        <Flex gap="0.4rem" flexDirection="column">
          <Heading as="h2" fontSize="xl">
            {props.titleProp}
          </Heading>
          <Text fontSize={['sm', 'md']}>{props.textProp}</Text>
        </Flex>
      </Center>
    </Flex>
  )
}
