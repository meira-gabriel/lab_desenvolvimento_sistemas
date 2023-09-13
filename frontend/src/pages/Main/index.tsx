import { Sidebar } from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

import { Container } from './styles'
import logoImg from '../../assets/logo.svg'
import { MyOrder } from '../../components/MyOrder'

export default function Home() {
  return (
    <Container>
      <Sidebar />

    <section>
      <img src={logoImg}></img>
      <Outlet/>
    </section>
    <MyOrder />
    </Container>
  )
}
