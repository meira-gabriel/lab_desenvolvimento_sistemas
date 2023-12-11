import { useCart } from '../../hooks/useCart'

import { ConvertValue } from '../../helpers/convertValue'

import { Container } from './style'

import { useNavigate } from 'react-router-dom'

export function ConfirmOrder() {
  const { cart } = useCart()

  const navigate = useNavigate()

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

  return (
    <Container>
      <button type='button' onClick={() => navigate("/Pagamento")}>Finalizar Pedido</button>
      <span>
        Total : <strong>{ConvertValue(totalAmount)}</strong>
      </span>
    </Container>
  )
}
