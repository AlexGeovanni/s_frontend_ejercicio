import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '@/page/home'
import MainLayout from '@/components/layout/mainLayout'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<></>} />
      </Route>
    </Routes>
  )
}

export default App
