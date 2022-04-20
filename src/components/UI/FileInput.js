import { Input, FormControl, Box, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'

import PreviewFiles from 'features/notes/components/PreviewFiles'

const FileInput = ({ register, name, accept, requiredProp, labelText, idProp, widthProp }) => {
  const [file, setFile] = useState()

  const setFileFunction = (e) => {
    setFile({
      files: {
        name: e.target.value
      }
    })
  }

  return (
    <FormControl isRequired={requiredProp} borderRadius="15px" position="relative">
      <Box bgColor="#EAEAEA" cursor="pointer" width={widthProp} padding="0">
        <FormLabel
          borderRadius="15px"
          htmlFor={idProp}
          width="100%"
          height="100%"
          textAlign="center"
          cursor="pointer"
          fontWeight="bold"
          margin="0"
          padding="0.7rem">
          {labelText}
        </FormLabel>
      </Box>
      <Input
        id={idProp}
        type="file"
        {...register(name)}
        accept={accept}
        padding="0.2rem"
        placeholder="Choose Project Logo"
        opacity="0"
        zIndex="-5"
        onChange={setFileFunction}
      />
      <Box
        flexWrap="wrap"
        gap="1rem"
        maxWidth="70%"
        d="inline-flex"
        position="absolute"
        bottom="0"
        left="0">
        {file && <PreviewFiles files={file} />}
      </Box>
    </FormControl>
  )
}

export default FileInput
