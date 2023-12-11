import { Sidebar } from '../../components/Sidebar'
import { Link, Outlet } from 'react-router-dom'

import { Container } from './styles'
import logoImg from '../../assets/logo.svg'
import { MyOrder } from '../../components/MyOrder'
import { useAccount } from '../../hooks/useAccount'

export default function Home() {
  const { role } = useAccount()

  return (
    <Container>
      <Sidebar />

      <section>
        <Link to='/Inicio'>
          <img src={logoImg}></img>
        </Link>
        <Outlet />
      </section>
      {role === 'usuario' && <MyOrder />}
    </Container>
  )
}
