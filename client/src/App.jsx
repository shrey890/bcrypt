import Contact from './pages/Contact'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}>
          <Route path=':aboutId' element={<About/>}/>
        </Route>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App