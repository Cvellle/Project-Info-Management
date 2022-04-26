import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import '@fontsource/poppins'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authState, getMeAsync } from './features/auth/authSlice'
import { UsersList } from 'features/edit-user/components/UsersList'
import { CreateProject } from 'features/Project/components/CreateProject'
import { Account } from 'features/account/components/Account'
import { Dashboard } from './features/dashboard/components/Dashboard'
import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import { NotFound } from 'components/NotFound'
import theme from './theme/theme'
import ProtectedRoutes from './routes/ProtectedRoute'
import Header from './components/Header'
import { admin, authenticated, employee, projectManager } from 'shared/constants'
import { EditUser } from 'features/edit-user/components/EditUser'
import { Unauthorized } from 'components/Unauthorized'
import ProjectRoutes from 'features/Project/components/ProjectRoutes'

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoutes authRoles={[authenticated, admin, employee, projectManager]} />
            }>
            <Route
              path="/"
              element={
                auth?.currentUser?.role === admin ? (
                  <UsersList />
                ) : auth?.currentUser?.role === authenticated ? (
                  <Unauthorized />
                ) : (
                  <Dashboard />
                )
              }
            />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[employee, projectManager]} />}>
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project/*" element={<ProjectRoutes />} />
          </Route>

          <Route element={<ProtectedRoutes authRoles={[admin]} />}>
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
