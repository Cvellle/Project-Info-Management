import { Flex, Heading, Text, Image, Center, Box } from '@chakra-ui/react'
import { apiURL } from 'services/axios'
import newTab from 'assets/new-tab.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export function ProjectItem(props) {
  const navigate = useNavigate()

  const navigateToProject = (idProp, e) => {
    console.log(e.target)
    navigate('project/' + idProp)
  }

  const seeInNewTab = (idProp, e) => {
    window.open('project/' + idProp)
    e.stopPropagation()
  }

  return (
    <Flex
      w={{ base: '100%', md: '495px' }}
      h="114px"
      m="31px 15px"
      onClick={(e) => navigateToProject(props.item.id, e)}
      cursor="pointer">
      <Image
        objectFit="contain"
        alt="employee"
        src={
          apiURL
            .split('/')
            .slice(0, apiURL.split('/').length - 1)
            .join('/') + props.item.attributes.logo.data.attributes.url
        }
        boxSize="77px"
        borderRadius="50%"
        m="auto 20px"
      />
      <Center w={{ base: '50%', md: 'auto' }}>
        <Box>
          <Heading as="h3" fontSize="24px" fontWeight="600" h="28px">
            {props.item.attributes.name}
          </Heading>
          {/* <Image objectFit="contain" alt="employee" src={usereImage} boxSize="96px" h="48" /> */}
          <Text maxW={{ base: '40vw', md: 'auto' }}>props.item.attributes.name</Text>
        </Box>
      </Center>
      <Center>
        <Box>
          <Link to={'project/' + props.item.id} target="_blank">
            <Image
              objectFit="contain"
              alt="employee"
              src={newTab}
              boxSize="28px"
              ml="auto"
              onClick={(e) => seeInNewTab(props.item.id, e)}
            />
          </Link>
          <Text>{props.item.attributes.employees.data.length} employees</Text>
        </Box>
      </Center>
    </Flex>
  )
}
