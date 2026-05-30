import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'
import Dashboard from './pages/Dashboard/Dashboard'
import RutaProtegida from './components/RutaProtegida'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <RutaProtegida>
            <Dashboard/>
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App