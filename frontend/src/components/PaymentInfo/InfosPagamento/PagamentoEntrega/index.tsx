import React, { useState } from 'react'
import { Container } from './styles'

import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';

import { useNavigate } from 'react-router-dom'

export default function PagamentoEntrega() {

  const navigate = useNavigate()

  const [methodPayment, setMethodPayment] = useState('')

  const handlePaymentMethodChange = (event: any) => {
    const selectedPaymentMethod = event.target.value;
    setMethodPayment(selectedPaymentMethod);
  };
  return (
    <Container>
      <div className="metodoPagamentoEntrega">
        <label className="radioLabel">
          <input
            type="radio"
            name="paymentMethod"
            value="dinheiro"
            checked={methodPayment === "dinheiro"}
            onChange={handlePaymentMethodChange}
          />
          <PaymentsIcon fontSize="large" />
          <span>Dinheiro</span>
        </label>

        <label className="radioLabel">
          <input
            type="radio"
            name="paymentMethod"
            value="cartao"
            checked={methodPayment === "cartao"}
            onChange={handlePaymentMethodChange}
          />
          <CreditCardIcon fontSize="large" />
          <span>{'Cartão (Crédito, Débito, Alimentação, Refeição)'}</span>
        </label>
      </div>

      <div>
        <button onClick={() => navigate('/Acompanhar-entrega')} >Continuar</button>
      </div>
    </Container>
  )
}