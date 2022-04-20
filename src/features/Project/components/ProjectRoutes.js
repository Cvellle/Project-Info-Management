import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from 'routes/ProtectedRoute'
import EditProject from './EditProject'
import { CreateNote } from 'features/notes/components/CreateNote'
import UpdateNote from 'features/notes/components/UpdateNote'
import { projectManager } from 'shared/constants'
import { Project } from './Project'
import ProjectDescription from './ProjectDescription'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetNotes } from 'features/notes/notesSlice'
import { emptyProject } from '../projectSlice'

const ProjectRoutes = () => {
  const { pathname } = useLocation()
  const chunks = pathname.split('/')
  const showDesc = !chunks.includes('edit')
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetNotes())
      dispatch(emptyProject())
    }
  }, [])

  return (
    <>
      {showDesc && <ProjectDescription />}
      <Routes>
        <Route path=":id" element={<Project />} />
        <Route element={<ProtectedRoutes authRoles={[projectManager]} />}>
          <Route path=":id/edit" element={<EditProject />} />
          <Route path=":id/add-note" element={<CreateNote />} />
          <Route path=":id/notes/:noteId/edit-note" element={<UpdateNote />} />
        </Route>
      </Routes>
    </>
  )
}

export default ProjectRoutes
