import { Flex, Center, Input } from '@chakra-ui/react'

import { Info } from '../../../components/Info'
// import { useDispatch } from 'react-redux'

export function Search() {
  // const dispatch = useDispatch()

  return (
    <Flex bgColor="#F5FDE7">
      <Flex bgColor="" w="1222px" m="auto" minH="165px">
        <Info imgProp={'/'} titleProp={'asd'} textProp={'asd'} />
        <Center w="320px" ml="auto">
          <Input placeholder="Search projects" size="xs" bgColor="#ffff" />
        </Center>
      </Flex>
    </Flex>
  )
}
