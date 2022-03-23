import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Projects } from './features/projects/components/Projects'
import { Route, Routes } from 'react-router-dom'
import { Register } from './features/auth/components/Register'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="header">header</header>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
