import './App.css'
import FrequencyPage from './pages/FrequencyPage'
import { HashRouter, Route, Routes } from 'react-router'
import ScalePage from './pages/ScalePage'
import NotfoundPage from './pages/error/NotfoundPage'
import { PAGE_URLS } from './constants/appSettings'
import ScorePage from './pages/ScorePage'
import ChordPage from '@/pages/ChordPage'
import IrealPage from '@/pages/IrealPage'


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/home" element={<DefaultPage><Home /></DefaultPage>} /> */}
        {/* <Route path="/score" element={<DefaultPage><ScorePageSample /></DefaultPage>} /> */}
        <Route path={PAGE_URLS.SCALE} element={<ScalePage />} />
        <Route path={PAGE_URLS.OSCILLATOR} element={<FrequencyPage />} />
        <Route path={PAGE_URLS.SCORE} element={<ScorePage />} />
        <Route path={PAGE_URLS.CHORD} element={<ChordPage />} />
        <Route path={PAGE_URLS.IREAL} element={<IrealPage />} />
        {/* <Route path="/table" element={<TablePage />} /> */}
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
