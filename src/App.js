import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import '@fontsource/poppins'

import { Dashboard } from './features/dashboard/components/Dashboard'
import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import theme from './theme/theme'
import ProtectedRoutes from './routes/ProtectedRoute'
import Header from './components/Header'
import { admin, employee, projectManager } from 'shared/constants'
import { Project } from 'features/Project/components/Project'
import { EditUser } from 'features/edit-user/components/EditUser'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes authRoles={[admin, employee, projectManager]} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoutes authRoles={[admin, employee, projectManager]} />}>
            <Route path="/project/:id" element={<Project />} />
          </Route>
          <Route element={<ProtectedRoutes authRoles={[admin]} />}>
            <Route path="/edit-user" element={<EditUser />} />
          </Route>
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
