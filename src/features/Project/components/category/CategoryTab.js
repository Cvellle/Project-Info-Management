import { CategoryHeader } from './CategoryHeader'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Center, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { notesState, getNotesAsync, emptyProject } from 'features/notes/notesSlice'
import CategoryNotes from './CategoryNotes'
import { getProjectAsync, selectedProject } from 'features/Project/projectSlice'
import { useDidUpdate } from 'hooks/useDidUpdate'

const CategoryTab = ({ category }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // selectors
  const project = useSelector(selectedProject)
  // states
  const { status } = useSelector(notesState)
  const [notesLocal, setNotesLocal] = useState()
  const [filtered, setFiltered] = useState()

  useEffect(() => {
    getProject()

    return () => {
      dispatch(emptyProject())
    }
  }, [])

  // function called from a CategoryHeader component
  const setFilteredFunction = (headerSearchRes) => {
    setFiltered(headerSearchRes)
  }

  // initial get notes
  let getProject = async () => {
    let projectRes = await dispatch(getProjectAsync(id))
    if (projectRes && !projectRes.error) {
      let notesResult = await dispatch(
        getNotesAsync({ id: project?.id, name: '', sort: 'createdAt:desc', category: category })
      )
      notesResult && !notesResult.error && setNotesLocal(notesResult.payload)
    }
  }

  // called on a search in the header
  let setFilteredNotes = () => {
    setNotesLocal(filtered)
  }

  useDidUpdate(setFilteredNotes, [filtered])

  let toMap = filtered ? filtered : notesLocal

  return (
    <>
      {notesLocal && (
        <Box>
          <CategoryHeader id={id} category={category} valueChangeHandler={setFilteredFunction} />
          {status === 'pending' && project ? (
            <Center h="50vh" opacity="0.5">
              {'Loading...'}
            </Center>
          ) : (
            notesLocal && <CategoryNotes notes={toMap?.data} />
          )}
        </Box>
      )}
    </>
  )
}

export default CategoryTab
