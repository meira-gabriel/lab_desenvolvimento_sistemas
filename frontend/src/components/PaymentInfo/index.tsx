import React, { useState } from 'react'
import { Container } from './styles'
import { OrderHeader } from '../OrderHeader'

import InfosEntrega from './InfosEntrega'
import InfosPagamento from './InfosPagamento'

export default function Pagamento() {
  const [infosEntrega, setInfosEntrega] = useState(true)
  const [infosCustomer, setInfosCustomer] = useState({})

  return (
    <Container>
      <OrderHeader />
      <div>
        {infosEntrega ? (
          <InfosEntrega setInfosEntrega={setInfosEntrega} setInfosCustomer={setInfosCustomer} />
        ) : (
          <InfosPagamento infosCustomer={infosCustomer} />
        )}
      </div>
    </Container>
  )
}
