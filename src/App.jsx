import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import './App.css'
import GetData from './getdata'
import RegisterForm from './pages/register'
import LoginForm from './pages/login'
import EditForm from './pages/edit'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<RegisterForm/>} />
        <Route path='/data' element={<GetData/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/edit/:id' element={<EditForm/>} />

      </Routes>
    </Router>
    </>
  )
}

export default App
