import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import '@fontsource/poppins'
import { Dashboard } from './features/dashboard/components/Dashboard'
import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import { NotAuthenticated } from 'routes/NotAuthenticated'
import { Unauthorized } from 'components/Unauthorized'
import { NotFound } from 'components/NotFound'
import theme from './theme/theme'
import ProtectedRoutes from './routes/ProtectedRoute'
import Header from './components/Header'
import { admin, employee, projectManager } from 'shared/constants'
import { Project } from 'features/Project/components/Project'
import { EditUser } from 'features/edit-user/components/EditUser'
import { getMeAsync, authState } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsersList } from 'features/edit-user/components/UsersList'
import { CreateProject } from 'features/Project/components/CreateProject'
import { Account } from 'features/account/components/Account'
import { CreateNote } from 'features/notes/components/CreateNote'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(authState)

  useEffect(() => {
    if (auth.jwt) {
      dispatch(getMeAsync())
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <div>
        <Header />
        <Routes>
          <Route element={<NotAuthenticated />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin, employee, projectManager]} />}>
            <Route
              path="/"
              element={auth?.currentUser?.role === admin ? <UsersList /> : <Dashboard />}
            />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin, employee, projectManager]} />}>
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project/:id/" element={<Project />}>
              {/* <Route path="add-note" element={<CreateNote />} /> */}
            </Route>
          </Route>

          <Route element={<ProtectedRoutes authRoles={[employee, projectManager]} />}>
            <Route path="/project/:id/add-note" element={<CreateNote />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin]} />}>
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
