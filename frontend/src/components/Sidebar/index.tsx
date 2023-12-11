import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ContainerMenu } from './styles'

import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from 'react-icons/ai'
import { FaMotorcycle } from 'react-icons/fa'
import { BsPersonCircle } from 'react-icons/bs'
import { IoFastFood } from 'react-icons/io5'
import { useAccount } from '../../hooks/useAccount'
import { BiLogOut } from 'react-icons/bi'

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { role, user, logout } = useAccount()

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <ContainerMenu isMenuOpen={menuOpen}>
      <button type='button' onClick={handleToggleMenu}>
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      <nav>
        {role === 'usuario' ? (
          <ul>
            <li>
              <NavLink to='/Inicio'>
                <AiOutlineHome />
                <span>Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/Produtos'>
                <IoFastFood />
                <span>Produtos</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/Perfil'>
                <BsPersonCircle />
                <span>Perfil</span>
              </NavLink>
            </li> */}
          </ul>
        ) : role === 'admin' ? (
          <ul>
            <li>
              <NavLink to='/Produtos'>
                <IoFastFood />
                <span>Controle</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to='/Entregador'>
                <FaMotorcycle />
                <span>Entregador</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/PerfilEntregador'>
                <BsPersonCircle />
                <span>Perfil</span>
              </NavLink>
            </li> */}
          </ul>
        )}
      </nav>
      {user && (
        <button type='button' onClick={logout}>
          <BiLogOut />
        </button>
      )}
    </ContainerMenu>
  )
}
