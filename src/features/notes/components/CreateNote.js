import { useEffect, useState } from 'react'
import { Center } from '@chakra-ui/react'

import NoteForm from './NoteForm'
import NoteBox from './NoteBox'
import { Spinner } from '@chakra-ui/spinner'

export function CreateNote() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)

    return () => {
      setLoaded(false)
    }
  }, [])

  return (
    <>
      {loaded ? (
        <NoteBox title="Create a new Note">
          <NoteForm
            title="Create new note"
            buttonText="Upload files"
            action="create"
            defaultValues={null}
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
