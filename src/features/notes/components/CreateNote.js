import NoteForm from './NoteForm'
import ProjectDescription from 'features/Project/components/ProjectDescription'
import NoteBox from './NoteBox'

export function CreateNote() {
  return (
    <>
      <ProjectDescription />
      <NoteBox title="Create a new Note">
        <NoteForm title="Create new note" buttonText="Upload files" action="create" />
      </NoteBox>
    </>
  )
}
