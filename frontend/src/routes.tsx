import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/Main'
import InicioPage from './pages/Main/Inicio'
import RestaurantesPage from './pages/Main/Produtos'
import PerfilPage from './pages/Main/Perfil'
import LoginPage from './pages/Login'
import MyCartPage from './pages/MyCart'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path='/' element={<HomePage />}>
        <Route path='/Inicio' element={<InicioPage />}/>
        <Route path='/Produtos' element={<RestaurantesPage />}/>
        <Route path='/Perfil' element={<PerfilPage />}/>
      </Route>
      <Route path='cart' element={<MyCartPage />} />
    </Routes>
  )
}
