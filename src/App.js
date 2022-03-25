import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import theme from './theme/theme'
import ProtectedRoutes from './routes/ProtectedRoute'
import { Projects } from './features/dashboard/components/Projects'
import '@fontsource/poppins'
import Header from './components/Header'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes authRoles="admin, project-manager, employee" />}>
            <Route path="/" element={<Projects />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
