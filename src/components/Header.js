import React from 'react'
import headerImage from '../assets/headerPhoto.png'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
  const { auth } = useSelector((state) => state)

  return (
    <Box backgroundColor="#F0F0F0">
      <Container>
        <Flex alignItems="center" justifyContent="space-between" padding="1rem 0">
          <Flex alignItems="center" position="relative">
            <Image
              objectFit="contain"
              alt="Q Project Info"
              src={headerImage}
              boxSize="50px"
              position="absolute"
              bottom="-35px"
            />
            <Heading as="h1" size="md" paddingLeft="60px">
              Q Project Info
            </Heading>
          </Flex>
          {auth.jwt && (
            <>
              <Flex gap="1.5rem" display={{ base: 'none', md: 'flex' }}>
                <Link as={NavLink} to="/projects">{`> My Projects`}</Link>
                <Link as={NavLink} to="/account">
                  {`> Account`}
                </Link>
                <Link as={NavLink} to="/">{`> Logout`}</Link>
              </Flex>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={GiHamburgerMenu} />}
                  variant="outline"
                  display={{ base: 'block', md: 'none' }}
                />
                <MenuList>
                  <MenuItem>
                    <Link as={NavLink} to="/projects">{`> My Projects`}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={NavLink} to="/account">
                      {`> Account`}sdf
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={NavLink} to="/">{`> Logout`}</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
