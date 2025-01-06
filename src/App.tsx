
import './App.css'
import Home from './pages/home'
import Notfound from './pages/error/notFound'
import { BrowserRouter, Route, Routes } from 'react-router'

const APP_NAME: String = "music-system";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_NAME + '/home'} element={<Home />} />
        <Route path={APP_NAME + '*'} element={ <Notfound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
