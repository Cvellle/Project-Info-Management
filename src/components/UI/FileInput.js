import { Input } from '@chakra-ui/react'

const FileInput = ({ register, name, accept }) => {
  return (
    <Input
      type="file"
      {...register(name)}
      accept={accept}
      padding="0.2rem"
      placeholder="Choose Project Logo"
    />
  )
}

export default FileInput
