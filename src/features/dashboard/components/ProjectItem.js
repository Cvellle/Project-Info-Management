import { Flex, Heading, Text } from '@chakra-ui/react'

export function ProjectItem(props) {
  return (
    <Flex>
      {/* <Image objectFit="contain" alt="employee" src={projectImage} boxSize="96px" h="48" /> */}
      <Flex>
        <Heading as="h2" textStyle="infoDescription">
          {props.projectTitle}
        </Heading>
        {/* <Image objectFit="contain" alt="employee" src={usereImage} boxSize="96px" h="48" /> */}
        <Text>{props.userName}</Text>
      </Flex>
      <Flex>
        {/* <Image objectFit="contain" alt="employee" src={newTabImage} boxSize="96px" h="48" /> */}
        <Text>{props.employees.length} employees</Text>
      </Flex>
    </Flex>
  )
}
