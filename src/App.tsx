
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ApplicationTemplate from './view/App'
import AuthenticationTemplate from './view/Auth'
function App() {
  return(<>
  <Router>
    <Routes>
      <Route path="/*" element={<><ApplicationTemplate/></>}/>
      <Route path="auth/*" element={<><AuthenticationTemplate/></>}/>
    </Routes>
  </Router>
  </>)
}

export default App
