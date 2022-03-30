import { Grid, Input, Flex, Box, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { DiReact } from 'react-icons/di'

import { Info } from '../../../components/Info'
// import { useDispatch } from 'react-redux'

export function Search() {
  // const dispatch = useDispatch()

  return (
    <Box bg="#F5FDE7">
      <Grid
        m="auto"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
        maxW="1280px"
        p="2rem 1rem"
        gap="2rem">
        <Info
          imgProp={'/'}
          titleProp={'My Projects'}
          textProp={`Here you'll find all your projects.`}
        />

        <Flex justifyContent={{ base: 'center', md: 'flex-end' }} alignItems="center">
          <InputGroup justifySelf="flex-end" width={{ base: '80%', md: '60%', lg: '50%' }}>
            <InputLeftElement pointerEvents="none" height="100%">
              <DiReact color="var(--chakra-colors-cyan-400)" />
            </InputLeftElement>
            <Input placeholder="Search projects" size="sm" bgColor="#ffff" width="100%" maxW="" />
          </InputGroup>
        </Flex>
      </Grid>
    </Box>
  )
}
