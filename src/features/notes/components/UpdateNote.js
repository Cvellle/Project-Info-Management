import { useParams } from 'react-router-dom'
import { Flex, Box, Center, Image, CloseButton, useToast, Spinner } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import NoteForm from './NoteForm'
import { getCatgoriesAsync, getNoteAsync, notesState } from '../notesSlice'
import { clearSelectedNote } from '../notesSlice'
import NoteBox from './NoteBox'
import { url } from 'shared/constants'
import NoteIcon from './NoteIcon'
import { deleteNoteFile } from '../api/deleteNoteFile'

const UpdateNote = () => {
  // hooks
  const { noteId } = useParams()
  const dispatch = useDispatch()
  const toast = useToast()
  // selectors and states
  const notesSelector = useSelector(notesState)
  const { noteFormDisabled, selectedNote } = notesSelector
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    dispatch(getNoteAsync(noteId))
    dispatch(getCatgoriesAsync())

    return () => {
      setLoaded(false)
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

  return (
    <>
      {selectedNote && loaded ? (
        <NoteBox title={!noteFormDisabled ? 'Edit Note' : 'View Note'}>
          <NoteForm
            disabledProp={false}
            title={'Update Note'}
            defaultValues={selectedNote?.attributes}
            buttonText="Upload new files"
            action="update"
            uploadedFiles={
              <>
                {selectedNote?.attributes?.files?.data && (
                  <Flex flexWrap="wrap" gap="1rem" maxWidth="70%">
                    {selectedNote?.attributes?.files?.data?.map((file) =>
                      file.attributes.mime?.split('/')[0] === 'image' ? (
                        <Box key={file.id} mr="30px" mb="30px">
                          <CloseButton onClick={removeFile.bind(this, file.id)} />
                          <Center h="150px" width="150px" border="1px solid lightgray" p="30px">
                            <Image src={url + file.attributes.url} height="auto" width="100%" />
                          </Center>
                          <Box mb="20px"> {file.attributes.name}</Box>
                        </Box>
                      ) : (
                        <Box key={file.id} mr="30px" mb="30px">
                          <CloseButton onClick={removeFile.bind(this, file.id)} />
                          <Center h="150px" width="150px" border="1px solid lightgray" p="30px">
                            <Flex>
                              <NoteIcon files="[file]" height="auto" width="100%" />
                            </Flex>
                          </Center>
                          <Box mb="20px"> {file.attributes.name}</Box>
                        </Box>
                      )
                    )}
                  </Flex>
                )}
              </>
            }
          />
        </NoteBox>
      ) : (
        <Center h="70vh">
          <Spinner />
        </Center>
      )}
    </>
  )
}

export default UpdateNote
