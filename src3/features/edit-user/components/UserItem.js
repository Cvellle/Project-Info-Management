import { Flex, Heading, Text, Image, Center, Box } from '@chakra-ui/react'
// import { apiURL } from 'services/axios'
import newTab from 'assets/new-tab.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export function UserItem(props) {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  let current = props?.item

  const navigateToProject = (idProp) => {
    navigate('edit-user/' + idProp)
  }

  const seeInNewTab = (idProp, e) => {
    window.open('edit-user/' + idProp)
    e.stopPropagation()
  }

  return (
    <Flex
      w={{ base: '100%' }}
      h="114px"
      m="31px 0px"
      onClick={(e) => navigateToProject(current.id, e)}
      cursor="pointer"
      justifyContent="space-between">
      {/* <Image
        objectFit="contain"
        alt="employee"
        src={
          apiURL
            .split('/')
            .slice(0, apiURL.split('/').length - 1)
            .join('/') + current.logo.data.url
        }
        boxSize="77px"
        borderRadius="50%"
        m="auto 20px"
      /> */}
      <Center w={{ base: '50%', md: 'auto' }}>
        <Box>
          <Heading as="h3" fontSize="24px" fontWeight="600" h="28px">
            {current.username}
          </Heading>
          {/* <Image objectFit="contain" alt="employee" src={usereImage} boxSize="96px" h="48" /> */}
          <Text maxW={{ base: '40vw', md: 'auto' }}>{current.email}</Text>
        </Box>
      </Center>
      <Center>
        <Box>
          <Link to={'edit-user/' + current.id} target="_blank">
            <Image
              objectFit="contain"
              alt="employee"
              src={newTab}
              boxSize="28px"
              ml="auto"
              onClick={(e) => seeInNewTab(current.id, e)}
            />
          </Link>
          <Text></Text>
        </Box>
      </Center>
    </Flex>
  )
}