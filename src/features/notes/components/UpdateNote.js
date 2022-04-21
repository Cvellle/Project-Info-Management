import { useParams } from 'react-router-dom'
import NoteForm from './NoteForm'
import { useDispatch, useSelector } from 'react-redux'
import { getNoteAsync, notesState, selectedNote } from '../notesSlice'
import { useEffect } from 'react'
import { clearSelectedNote } from '../notesSlice'
import NoteBox from './NoteBox'

const UpdateNote = () => {
  const { noteId } = useParams()
  const dispatch = useDispatch()
  const note = useSelector(selectedNote)
  const notesSelector = useSelector(notesState)
  const { noteFormDisabled } = notesSelector

  useEffect(() => {
    dispatch(getNoteAsync(noteId))

    return () => {
      dispatch(clearSelectedNote())
    }
  }, [])

  return (
    <>
      {note && (
        <NoteBox title={!noteFormDisabled ? 'Edit Note' : 'View Note'}>
          <NoteForm
            disabledProp={false}
            title={'Update Note'}
            defaultValues={note?.attributes}
            buttonText="Upload new files"
            action="update"
          />
        </NoteBox>
      )}
    </>
  )
}

export default UpdateNote
