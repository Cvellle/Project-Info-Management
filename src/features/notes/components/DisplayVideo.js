import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import axios from 'axios'

const DisplayVideo = ({ urlPath }) => {
  const [content, setContent] = useState()

  // const getContent = async () => {
  //   let result = await fetch(urlPath)
  //   if (result && !result.error) {
  //     let textResult = await result
  //     textResult && !textResult.error && console.log(textResult)
  //   }
  // }

  // useEffect(() => {
  //   getContent()
  // }, [])

  useEffect(() => {
    axios.get(urlPath, { headers: { Accept: 'video/mp4;charset=UTF-8' } }).then((response) => {
      let myUrl = (window.URL || window.webkitURL).createObjectURL(new Blob([response.data])) // response.data.dat
      setContent(myUrl)
    })
  })

  return (
    <Box background="white" w="100%" h="100%">
      <video id="vidObj" width="500" height="360" controls loop muted>
        <source src={content && content} type="video/mp4" />
      </video>
    </Box>
  )
}
export default DisplayVideo
