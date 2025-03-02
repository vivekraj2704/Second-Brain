import './index.css'
import { Dashboard } from './pages/Dashboard'
import { SharedId } from './pages/SharedID'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return ( 
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/share/:shareID" element={<SharedId />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
