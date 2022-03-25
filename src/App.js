import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import '@fontsource/poppins'

import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import theme from './theme/theme'
import ProtectedRoutes from './routes/ProtectedRoute'
import Header from './components/Header'
import { Dashboard } from './features/dashboard/components/Dashboard'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes authRoles="admin, project-manager, employee" />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
