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
import { getMeAssync, authState } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsersList } from 'features/edit-user/components/UsersList'
import { CreateProject } from 'features/Project/components/CreateProject'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(authState)

  useEffect(() => {
    if (auth.jwt) {
      dispatch(getMeAssync())
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
            {auth?.currentUser?.role === admin ? (
              <Route path="/" element={<UsersList />} />
            ) : (
              <Route path="/" element={<Dashboard />} />
            )}
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin, employee, projectManager]} />}>
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin]} />}>
            <Route path="/users" element={<UsersList />} />
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
