import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<UploadPage />}
        />

        <Route
          path='/dashboard'
          element={<DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App