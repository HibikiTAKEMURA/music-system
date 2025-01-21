import './App.css'
import DefaultPage from './pages/DefaultPage'
import Home from './pages/Home'
import ScalePage from './pages/ScalePage'
import ScorePageSample from './pages/ScorePageSample'
import Notfound from './pages/error/notFound'
import { HashRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<DefaultPage><Home /></DefaultPage>} />
        <Route path="/score" element={<DefaultPage><ScorePageSample /></DefaultPage>} />
        <Route path="/scale" element={<DefaultPage><ScalePage /></DefaultPage>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
