import { Flex } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { authState } from 'features/auth/authSlice'

export function Project() {
  // const dispatch = useDispatch()
  const authSelector = useSelector(authState)

  useEffect(() => {
    console.log(authSelector.currentUser)
    // dispatch(getProjectAssync())
  }, [])

  return (
    <Flex flexWrap="wrap" w="calc(1222px + 15px)" m="31px auto">
      s
    </Flex>
  )
}
