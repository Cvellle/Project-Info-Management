import { useParams } from 'react-router-dom'
import NoteForm from './NoteForm'
import { useDispatch, useSelector } from 'react-redux'
import { getNoteAsync, selectedNote } from '../notesSlice'
import { useEffect } from 'react'
import { clearSelectedNote } from '../notesSlice'
import { Box, CloseButton, Flex, Text, useToast } from '@chakra-ui/react'
import { deleteNoteFile } from '../api/deleteNoteFile'
import ProjectDescription from 'features/Project/components/ProjectDescription'
import NoteBox from './NoteBox'

const UpdateNote = () => {
  const { noteId } = useParams()
  const dispatch = useDispatch()
  const note = useSelector(selectedNote)
  const toast = useToast()

  useEffect(() => {
    dispatch(getNoteAsync(noteId))

    return () => {
      dispatch(clearSelectedNote())
    }
  }, [])

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

  const uploadedFiles = (
    <>
      {note?.attributes?.files?.data ? (
        <Box>
          <Text>Files</Text>
          <Flex gap="1rem" flexWrap="wrap">
            {note?.attributes?.files?.data.map((file) => (
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

  return (
    <>
      <ProjectDescription />
      {note && (
        <NoteBox title="Edit Note">
          <NoteForm
            title={'Update Note'}
            defaultValues={note?.attributes}
            uploadedFiles={uploadedFiles}
            buttonText="Upload new files"
            action="update"
          />
        </NoteBox>
      )}
    </>
  )
}

export default UpdateNote
