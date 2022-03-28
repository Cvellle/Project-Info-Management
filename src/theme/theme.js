import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif'
  },
  textStyles: {
    h1: {
      fontSize: ['32px', '32px !important']
    },
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
