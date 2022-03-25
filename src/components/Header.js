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
  Icon
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
  const { auth } = useSelector((state) => state)

  return (
    <Flex backgroundColor="#F0F0F0" p={'20px 62px 20px 47px'} m="0" h="88px" align-items="center">
      <Flex alignItems="center" justifyContent="space-between">
        <Image
          objectFit="contain"
          alt="Q Project Info"
          src={headerImage}
          boxSize="103px"
          position="absolute"
          top="11px"
        />
        <Flex alignItems="center" position="relative">
          <Heading as="h1" size="md" paddingLeft="125px">
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
    </Flex>
  )
}

export default Header
