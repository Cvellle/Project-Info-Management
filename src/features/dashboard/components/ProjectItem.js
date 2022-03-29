import { Flex, Heading, Text, Image, Center, Box } from '@chakra-ui/react'
import { apiURL } from 'services/axios'
import newTab from 'assets/new-tab.png'

export function ProjectItem(props) {
  return (
    <Flex w="495px" h="114px" m="31px 15px">
      <Image
        objectFit="contain"
        alt="employee"
        src={
          apiURL
            .split('/')
            .slice(0, apiURL.split('/').length - 1)
            .join('/') + props.projectImg
        }
        boxSize="77px"
        borderRadius="50%"
        m="auto 20px"
      />
      <Center>
        <Box>
          <Heading as="h3" fontSize="24px" fontWeight="600" h="28px">
            {props.projectTitle}
          </Heading>
          {/* <Image objectFit="contain" alt="employee" src={usereImage} boxSize="96px" h="48" /> */}
          <Text>props.userName</Text>
        </Box>
      </Center>
      <Center>
        <Box>
          <Image objectFit="contain" alt="employee" src={newTab} boxSize="28px" ml="auto" />
          <Text>props.employees.length employees</Text>
        </Box>
      </Center>
    </Flex>
  )
}
