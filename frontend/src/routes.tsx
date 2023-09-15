import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/Main'
import InicioPage from './pages/Main/Inicio'
import ProdutosPage from './pages/Main/Produtos'
import PerfilPage from './pages/Main/Perfil'
import LoginPage from './pages/Login'
import MyCartPage from './pages/MyCart'
import PaymentPage from './pages/Payment'

import { useAccount } from './hooks/useAccount'
// import { useAccount } from './hooks/useAccount'

// interface PrivateProps {
//   readonly children: JSX.Element
//   readonly roles?: string
// }

// function Private({ children, roles }: PrivateProps) {
//   const { authenticated, role } = useAccount()

//   if (!roles && authenticated) {
//     return children
//   }

//   if (!authenticated) {
//     return <Navigate to="/" />
//   }

//   return role === "admin" ? children : <div>Você não tem permissão para acessar essa página</div>
// }

export function AppRoutes() {

  const { role } = useAccount()

  return (
    <Routes>
      <Route index element={<LoginPage/>} />
      <Route path='/' element={<HomePage />}>
        <Route path='/Inicio' element={<InicioPage />}/>
        <Route path='/Produtos' element={<ProdutosPage tipoUsuario={role} />}/>
        <Route path='/Perfil' element={<PerfilPage />}/>
      </Route>
      <Route path='cart' element={<MyCartPage />} />
      <Route path='pagamento' element={<PaymentPage />} />
    </Routes>
  )
}
