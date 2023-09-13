import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ContainerMenu } from './styles'

import { AiOutlineMenu, AiOutlineClose, AiOutlineHome }  from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import { IoFastFood } from 'react-icons/io5'

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <ContainerMenu isMenuOpen={menuOpen}>
      <button type='button' onClick={handleToggleMenu}>
        {menuOpen ? <AiOutlineClose/> : <AiOutlineMenu/>}
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to="/Inicio">
              <AiOutlineHome />
              <span>Início</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Produtos">
              <IoFastFood />
              <span>Restaurantes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Perfil">
              <BsPersonCircle />
              <span>Perfil</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </ContainerMenu>
  )
}
