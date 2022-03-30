import React from 'react'
import headerImage from '../assets/headerPhoto.png'
import {
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
  Box,
  Container
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <Box backgroundColor="#F0F0F0" padding={{ base: '0.5rem 0', md: '1.3rem 0' }}>
      <Container maxW="1500px">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" position="relative">
            <Image
              objectFit="contain"
              alt="Q Project Info"
              src={headerImage}
              boxSize={{ base: '70px', md: '70px', lg: '80px' }}
              position="absolute"
              bottom={{ base: '-46px', md: '-38px', lg: '-42px' }}
            />
            <Heading
              as="h1"
              fontSize={['md', 'lg', 'xl']}
              paddingLeft={{ base: '85px', md: '85px', lg: '95px' }}
              fontWeight="extrabold">
              Q Project Info
            </Heading>
          </Flex>
          {auth.jwt && (
            <>
              <Flex gap="1.5rem" display={{ base: 'none', md: 'flex' }}>
                <Link
                  as={NavLink}
                  to="/"
                  style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
                  {`> My Projects`}
                </Link>
                <Link
                  as={NavLink}
                  to="/account"
                  style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
                  {`> Account`}
                </Link>
                <Link
                  as={NavLink}
                  to="/login"
                  onClick={() => dispatch(logout())}>{`> Logout`}</Link>
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
                    <Link
                      as={NavLink}
                      to="/"
                      style={({ isActive }) =>
                        isActive ? { fontWeight: 'bold' } : undefined
                      }>{`> My Projects`}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      as={NavLink}
                      to="/account"
                      style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : undefined)}>
                      {`> Account`}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      as={NavLink}
                      to="/login"
                      onClick={() => dispatch(logout())}>{`> Logout`}</Link>
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
