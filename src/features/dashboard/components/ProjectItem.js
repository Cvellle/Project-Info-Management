import { Flex, Heading, Text, Image, VStack, IconButton } from '@chakra-ui/react'
import { apiURL } from 'services/axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MdOpenInNew } from 'react-icons/md'

export function ProjectItem(props) {
  const navigate = useNavigate()

  const navigateToProject = (idProp) => {
    navigate('project/' + idProp)
  }

  const seeInNewTab = (idProp, e) => {
    window.open('project/' + idProp)
    e.stopPropagation()
  }

  return (
    <Flex
      onClick={(e) => navigateToProject(props.item.id, e)}
      cursor="pointer"
      bgColor="#F0F0F0"
      borderRadius="0.3rem"
      padding={{ base: '0.5rem', md: '1.5rem' }}
      width="100%"
      alignItems="center"
      justifyContent="space-between">
      <Flex alignItems="center" gap="0.8rem">
        <Image
          objectFit="contain"
          alt="employee"
          src={
            apiURL
              .split('/')
              .slice(0, apiURL.split('/').length - 1)
              .join('/') + props?.item?.attributes?.logo?.data?.attributes.url
          }
          boxSize={{ base: '50px', md: '70px' }}
          borderRadius="50%"
        />
        <VStack alignItems="flex-start">
          <Heading as="h3" fontSize={['md', 'xl']} fontWeight="600">
            {props.item?.attributes?.name}
          </Heading>
          <Text>{props.item?.attributes?.name}</Text>
        </VStack>
      </Flex>

      <Flex flexDirection="column" alignItems="flex-end" gap="0.5rem">
        <Link to={'project/' + props.item.id} target="_blank">
          <IconButton
            icon={<MdOpenInNew />}
            fontSize="3xl"
            bgColor="#F0F0F0"
            onClick={(e) => seeInNewTab(props.item.id, e)}
          />
        </Link>
        <Text fontSize={['xs', 'sm']}>
          {props.item.attributes?.employees?.data.length} employees
        </Text>
      </Flex>
    </Flex>
  )
}
