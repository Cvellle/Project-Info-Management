import { CategoryHeader } from './CategoryHeader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notesState, getNotesAsync } from 'features/notes/notesSlice'
import { Spinner, Center } from '@chakra-ui/react'

import CategoryNotes from './CategoryNotes'
import { useEffect, useState } from 'react'
import { getProjectAsync, selectedProject } from 'features/Project/projectSlice'

const CategoryTab = ({ category }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // const categoryNotes = useSelector(notes)
  const project = useSelector(selectedProject)

  const { status } = useSelector(notesState)

  const [notesLocal, setNotesLocal] = useState()
  const [filtered, setFiltered] = useState()

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let projectRes = await dispatch(getProjectAsync(id))
    if (projectRes) {
      let notesResult = await dispatch(
        getNotesAsync({ id: project?.id, name: null, sort: 'createdAt:desc', category: category })
      )
      notesResult && !notesResult.error && setNotesLocal(notesResult.payload)
    }
  }

  let toMap = filtered ? filtered : notesLocal

  return (
    <>
      <CategoryHeader id={id} category={category} valueChangeHandler={setFiltered} />
      {status === 'pending' ? (
        <Center padding="1rem">
          <Spinner size="xl" />
        </Center>
      ) : (
        notesLocal && <CategoryNotes notes={toMap?.data} />
      )}
    </>
  )
}

export default CategoryTab
