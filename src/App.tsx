import './App.css'
import FrequencyPage from './pages/FrequencyPage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ScalePage from './pages/ScalePage'
import NotfoundPage from './pages/error/NotfoundPage'
import TunerPage from './pages/TunerPage'


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/home" element={<DefaultPage><Home /></DefaultPage>} /> */}
        {/* <Route path="/score" element={<DefaultPage><ScorePageSample /></DefaultPage>} /> */}
        <Route path="/scale" element={<ScalePage />} />
        <Route path="/frequency" element={<FrequencyPage />} />
        <Route path="/tuner" element={<TunerPage />} />
        {/* <Route path="/table" element={<DefaultPage><TablePage /></DefaultPage>} /> */}
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
