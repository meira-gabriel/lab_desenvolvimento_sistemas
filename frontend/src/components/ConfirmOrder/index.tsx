import { useCart } from '../../hooks/useCart'

import { ConvertValue } from '../../helpers/convertValue'

import { Container } from './style'

export function ConfirmOrder() {
  const { cart } = useCart()

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

  return (
    <Container>
      <button type='button'>Finalizar Pedido</button>
      <span>
        Total : <strong>{ConvertValue(totalAmount)}</strong>
      </span>
    </Container>
  )
}
