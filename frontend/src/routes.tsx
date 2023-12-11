import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/Main'
import InicioPage from './pages/Main/Inicio'
import ProdutosPage from './pages/Main/Produtos'
import PerfilPage from './pages/Main/Perfil'
import LoginPage from './pages/Login'
import MyCartPage from './pages/MyCart'
import PaymentPage from './pages/Payment'
import TrackDeliveryPage from './pages/TrackDelivery'

import { useAccount } from './hooks/useAccount'
import PageEntregador from './pages/Main/pageEntregador'
import PagePerfilEntregador from './pages/Main/pageEntregador/PagePerfilEntregador'

export function AppRoutes() {
  const { role } = useAccount()

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      {role === 'usuario' || role === 'admin' ? (
        <>
          <Route path='/' element={<HomePage />}>
            <Route path='/Inicio' element={<InicioPage />} />
            <Route path='/Produtos' element={<ProdutosPage tipoUsuario={role} />} />
            <Route path="/produtos/:nomeRestaurante" element={<ProdutosPage tipoUsuario={role} />} />
            <Route path='/Perfil' element={<PerfilPage />} />
          </Route>
          <Route path='Carrinho' element={<MyCartPage />} />
          <Route path='Pagamento' element={<PaymentPage />} />
          <Route path='Acompanhar-entrega' element={<TrackDeliveryPage />} />
        </>
      ) : (
        <Route path='/' element={<HomePage />}>
          <Route path='/Entregador' element={<PageEntregador />} />
          <Route path='/PerfilEntregador' element={<PagePerfilEntregador />} />
        </Route>
      )}
    </Routes>
  )
}
