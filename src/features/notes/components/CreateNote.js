import NoteForm from './NoteForm'
import NoteBox from './NoteBox'

export function CreateNote() {
  return (
    <>
      <NoteBox title="Create a new Note">
        <NoteForm
          title="Create new note"
          buttonText="Upload files"
          action="create"
          // disabledProp={false}
        />
      </NoteBox>
    </>
  )
}
