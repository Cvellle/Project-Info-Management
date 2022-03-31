import { Grid, Box } from '@chakra-ui/react'
import { Info } from './Info'
import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'
import { projectManager } from 'shared/constants'
import { useLocation } from 'react-router-dom'

export const PageDescription = ({ image, title, text, children }) => {
  const { currentUser } = useSelector(authState)
  const location = useLocation()

  let sectionBgColor = currentUser.role === projectManager ? '#E7FDFD' : '#F5FDE7'
  if (location.pathname.split('/').includes('project')) {
    sectionBgColor = '#EDE7FD'
  }

  return (
    <Box bg={sectionBgColor}>
      <Grid
        m="auto"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
        maxW="1280px"
        p="2rem 1rem"
        gap="2rem">
        <Info image={image} title={title} text={text} />
        {children}
      </Grid>
    </Box>
  )
}
