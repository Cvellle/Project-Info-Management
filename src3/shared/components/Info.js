// import { Box, Center, Text, Flex, Heading } from '@chakra-ui/react'
import { Text, Flex, Center, Box, Heading, Square, Input } from '@chakra-ui/react'

export function Info(props) {
  return (
    <Flex color="white">
      <Square size="150px">
        <Square
          size="100px"
          bgImage={props.imgProp}
          bgPosition="center"
          bgRepeat="no-repeat"
          borderRadius="50%"
          bg="blue.500"
        />
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
      <Center w="100px" ml="auto">
        <Input placeholder="Search projects" size="xs" />
      </Center>
    </Flex>
  )
}