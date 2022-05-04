import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

const DisplayText = ({ url }) => {
  const [content, setContent] = useState()

  const getContent = async () => {
    let result = await fetch(url)
    if (result && !result.error) {
      let textResult = await result.text()
      textResult && !textResult.error && setContent(textResult)
    }
  }

  useEffect(() => {
    getContent()
  }, [])

  return (
    <Box background="white" w="100%" h="100%">
      <pre>{content && content}</pre>
    </Box>
  )
}
export default DisplayText
