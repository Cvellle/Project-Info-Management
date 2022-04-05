import { Input, FormControl } from '@chakra-ui/react'

const FileInput = ({ register, name, accept }) => {
  return (
    <FormControl isRequired>
      <Input
        type="file"
        {...register(name)}
        accept={accept}
        padding="0.2rem"
        placeholder="Choose Project Logo"
      />
    </FormControl>
  )
}

export default FileInput
