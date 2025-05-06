import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

// pages
import Home from './pages/Home'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </BrowserRouter>

      <Analytics />
    </>
  )
}

export default App
