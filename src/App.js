import React from 'react'
import './App.css'
import { Projects } from './features/projects/components/Projects'
import { Route, Routes } from 'react-router-dom'

function App() {
   console.log(process.env.REACT_APP_API_URL)
   return (
      <div className='App'>
         <header className='header'>header</header>
         <Routes>
            <Route path='/' element={<Projects />} />
         </Routes>
      </div>
   )
}

export default App
