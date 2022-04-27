import {
  Flex,
  Box,
  // Image,
  Text,
  CloseButton
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { deleteNoteFile } from 'features/notes/api/deleteNoteFile'
import { getNoteAsync } from 'features/notes/notesSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const UploadedFiles = ({ filesArray }) => {
  const { noteId } = useParams()

  const toast = useToast()
  const dispatch = useDispatch()

  const removeFile = async (id) => {
    try {
      await deleteNoteFile(id)
      toast({
        title: 'File deleted.',
        description: 'You have successfully deleted the file 😊',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      dispatch(getNoteAsync(noteId))
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Error,please try again later!',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      {filesArray ? (
        <Box>
          <Text>Files</Text>
          <Flex gap="1rem" flexWrap="wrap">
            {filesArray?.map((file) => (
              <Flex
                key={file.id}
                gap="0.6rem"
                alignItems="center"
                justifyContent="space-between"
                bgColor="#ede7fd"
                width="fit-content"
                padding="0.1rem 0.5rem"
                marginBottom="0.5rem"
                borderRadius="0.2rem">
                <Text>{file.attributes.name}</Text>
                <CloseButton onClick={removeFile.bind(this, file.id)} />
              </Flex>
            ))}
          </Flex>
        </Box>
      ) : (
        ''
      )}
    </>
  )
}

export default UploadedFiles
