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

  const { status, notes } = useSelector(notesState)

  const [notesLocal, setNotesLocal] = useState()
  const [filtered, setFiltered] = useState()

  useEffect(() => {
    console.log(notes)
    dispatch(getProjectAsync(id))
    getNotes()
  }, [])

  let getNotes = async () => {
    let notesResult = await dispatch(
      getNotesAsync({ id: project?.id, name: null, sort: 'createdAt:desc', category: category })
    )
    notesResult && !notesResult.error && setNotesLocal(notesResult.payload)
  }

  let toMap = filtered ? filtered : notesLocal

  return (
    <>
      <CategoryHeader id={id} category={category} valueChangeHandler={setFiltered} />
      {status === 'pending' && !notesLocal ? (
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
