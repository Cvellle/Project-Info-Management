// import { Box, Center, Text, Flex, Heading } from '@chakra-ui/react'
import { Text, Flex, Center, Box, Heading, Square, Image } from '@chakra-ui/react'
import rocketImage from 'assets/rocket.png'

export function Info(props) {
  return (
    <Flex color="white">
      <Square size="150px">
        <Image objectFit="contain" alt="employee" src={rocketImage} boxSize="96px" mr="auto" />
      </Square>
      <Center w="100px">
        <Box>
          <Heading as="h2" textStyle="infoDescription">
            {props.titleProp}
          </Heading>
          <Text display="flex" textStyle="infoDescription">
            {props.textProp}
          </Text>
        </Box>
      </Center>
    </Flex>
  )
}
