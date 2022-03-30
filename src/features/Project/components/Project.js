import { Flex } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProjectAssync } from '../projectSlice'

export function Project() {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getProjectAssync(params.id))
  }, [])

  return (
    <Flex flexWrap="wrap" w="calc(1222px + 15px)" m="31px auto">
      s
    </Flex>
  )
}
