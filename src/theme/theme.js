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
  },
  components: {
    Button: {
      variants: {
        submitButton: {
          fontSize: '18px',
          width: '110px',
          height: '48px',
          borderRadius: '10px',
          background: '#805ad5',
          color: 'white'
        }
      }
    }
  }
})

export default theme
