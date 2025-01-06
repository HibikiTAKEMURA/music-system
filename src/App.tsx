import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home'
import Notfound from './pages/error/notFound'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="*" element={ <Notfound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
