import { CategoryHeader } from './CategoryHeader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesAsync } from 'features/notes/notesSlice'
import { useEffect } from 'react'
import CategoryNotes from './CategoryNotes'
import { notes } from 'features/notes/notesSlice'

const CategoryTab = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const categoryNotes = useSelector(notes)

  useEffect(() => {
    dispatch(getNotesAsync(id))
  }, [])

  return (
    <>
      <CategoryHeader id={id} />
      {categoryNotes && <CategoryNotes notes={categoryNotes?.data} />}
    </>
  )
}

export default CategoryTab
