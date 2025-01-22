import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// pages
import Home from './pages/Home'

// styles 
import './App.css'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
