import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif'
  },
  textStyles: {
    h2: {
      fontSize: ['28px', '25px'],
      color: 'black'
    },
    infoDescription: {
      fontSize: '16px',
      color: 'black'
    }
  }
})

export default theme
