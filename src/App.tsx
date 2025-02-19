import './App.css'
import DefaultPage from './pages/DefaultPage'
import FrequencyPage from './pages/FrequencyPage'
import Home from './pages/Home'
import ScalePage from './pages/ScalePage'
import ScorePageSample from './pages/ScorePageSample'
import TablePage from './pages/TablePage'
import Notfound from './pages/error/notFound'
import { HashRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<DefaultPage><Home /></DefaultPage>} />
        {/* <Route path="/score" element={<DefaultPage><ScorePageSample /></DefaultPage>} /> */}
        <Route path="/scale" element={<DefaultPage><ScalePage /></DefaultPage>} />
        <Route path="/frequency" element={<DefaultPage><FrequencyPage /></DefaultPage>} />
        <Route path="/table" element={<DefaultPage><TablePage /></DefaultPage>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
