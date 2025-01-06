
import './App.css'
import Home from './pages/home'
import Notfound from './pages/error/notFound'
import { HashRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
