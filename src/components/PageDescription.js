import { Grid, Box } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'
import { Info } from './Info'
import { projectManager } from 'shared/constants'

export const PageDescription = ({ image, title, text, children, linkPath }) => {
  const { currentUser } = useSelector(authState)
  const location = useLocation()

  let sectionBgColor = currentUser.role === projectManager ? '#E7FDFD' : '#F5FDE7'
  if (location.pathname.split('/').includes('project')) {
    if (currentUser.role === projectManager) {
      sectionBgColor = '#EDE7FD'
    } else {
      sectionBgColor = '#E7FDFD'
    }
  }

  return (
    <Box bg={sectionBgColor}>
      <Grid
        m="auto"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
        maxW="1280px"
        p="2rem 1rem"
        gap="2rem">
        <Info image={image} title={title} text={text} linkPath={linkPath} />
        {children}
      </Grid>
    </Box>
  )
}
