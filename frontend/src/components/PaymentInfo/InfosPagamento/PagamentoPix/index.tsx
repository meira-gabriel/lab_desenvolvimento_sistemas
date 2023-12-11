import React from 'react'
import { Container } from './styles'
import QrCode from '../../../../assets/qrcode.png'
import { ConvertValue } from '../../../../helpers/convertValue'
import { useCart } from '../../../../hooks/useCart'

import { useNavigate } from 'react-router-dom'

export default function PagamentoPix() {

  const navigate = useNavigate()

  const { cart } = useCart()

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

  return (
    <Container>
      <div>
        <img src={QrCode} />
      </div>

      <div className="finalizarPagamento">
        <span>Valor total: <strong>{ConvertValue(totalAmount)}</strong></span>
        <button onClick={() => navigate('/Acompanhar-entrega')}>Continuar</button>
      </div>
    </Container>
  )
}