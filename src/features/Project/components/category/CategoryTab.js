import { CategoryHeader } from './CategoryHeader'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notesState, notes } from 'features/notes/notesSlice'
import { Spinner, Center } from '@chakra-ui/react'

import CategoryNotes from './CategoryNotes'

const CategoryTab = () => {
  const { id } = useParams()
  const categoryNotes = useSelector(notes)
  const { status } = useSelector(notesState)

  return (
    <>
      <CategoryHeader id={id} />
      {status === 'pending' ? (
        <Center padding="1rem">
          <Spinner size="xl" />
        </Center>
      ) : (
        categoryNotes && <CategoryNotes notes={categoryNotes?.data} />
      )}
    </>
  )
}

export default CategoryTab
