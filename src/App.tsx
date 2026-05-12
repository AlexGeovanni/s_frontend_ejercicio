import { Route, Routes } from 'react-router-dom'
import Home from '@/page/home'
import MainLayout from '@/components/layout/mainLayout'
import Favorites from './page/favorites'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App;
