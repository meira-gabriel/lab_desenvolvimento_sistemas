import { useCart } from '../../hooks/useCart'

import { ReactComponent as CartIcon } from '../../assets/shopping-cart.svg'
import { Container } from './styles'

export function MyOrder() {
  const { cart } = useCart()

  return (
    <Container to={'carrinho'}>
      <span>Carrinho</span>
      <CartIcon />
      {cart.length !== 0 && <span>{cart.length}</span>}
    </Container>
  )
}
