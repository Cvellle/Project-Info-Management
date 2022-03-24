import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { Register } from './features/auth/components/Register'
import { Login } from './features/auth/components/Login'
import theme from './theme/theme'
import '@fontsource/poppins'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <header className="header">header</header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
