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

  useEffect(() => {
    a()
    dispatch(getProjectAsync(id))
  }, [])

  let a = async () => {
    let b = await dispatch(getNotesAsync({ id: project.id, name, sort: 'createdAt:asc', category }))
    setNotesLocal(b.payload)
  }

  return (
    <>
      <CategoryHeader id={id} category={category} />
      {status === 'pending' ? (
        <Center padding="1rem">
          <Spinner size="xl" />
        </Center>
      ) : (
        notesLocal && <CategoryNotes notes={notesLocal?.data} />
      )}
    </>
  )
}

export default CategoryTab
