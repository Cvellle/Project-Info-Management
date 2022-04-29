import { Avatar as ChakraAvatar, Tooltip } from '@chakra-ui/react'

const Avatar = (props) => {
  return (
    <>
      <Tooltip label={props.name} closeOnClick={false}>
        <ChakraAvatar {...props} />
      </Tooltip>
    </>
  )
}

export default Avatar
