import { Link } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'

import { Container } from './styles'

import logoImg from '../../assets/logo.svg'
import { ReactComponent as CartIcon } from '../../assets/shopping-cart.svg'

export function OrderHeader() {
  const { cart } = useCart()

  return (
    <Container>
      <Link to='/Inicio'>
        <img src={logoImg} alt='Food Commerce' />
      </Link>
      <div className="carrinho">
        <div>
          <h3>Carrinho</h3>
          <span>
            <strong>{cart.length}</strong> produto(s)
          </span>
        </div>
        <CartIcon />
      </div>
    </Container>
  )
}
