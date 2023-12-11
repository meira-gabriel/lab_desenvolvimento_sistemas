import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import { BsCircleFill } from 'react-icons/bs'
import { getAllDeliveries, setStatusDelivery } from '../../../services/deliveryService'
import { useCart } from '../../../hooks/useCart'

function DeliveryPanel() {
  const { setDeliveryFull, setStartedDelivery, clearCart, setDeliveryId, setDuration } = useCart()

  const [deliveries, setDeliveries] = useState<any>([])
  const [deliveryStarted, setDeliveryStarted] = useState<any>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDeliveries()
        setDeliveries(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const startDelivery = async (deliveryId: number) => {
    try {
      const startedDelivery = await setStatusDelivery(deliveryId, 'PAID')
      setDeliveryStarted(startedDelivery.data)
      setStartedDelivery(true)
      setDeliveryFull(false)
      const response = await getAllDeliveries()
      setDeliveries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const finishDelivery = async (deliveryId: number) => {
    try {
      await setStatusDelivery(deliveryId, 'FINISHED')
      setDeliveryFull(true)
      setStartedDelivery(false)
      clearCart()
      setDeliveryStarted({})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <div className='headerPainel'>
        <h3>Painel de controle do entregador</h3>
        <div>
          <span>Status:</span>
          <BsCircleFill color='#2E8B57' size={10} style={{ marginRight: '5px' }} /> Online
        </div>
      </div>

      <div className='deliveryInfo'>
        <h3>
          {Object.keys(deliveryStarted).length === 0
            ? 'Entregas disponíveis:'
            : 'Entrega em andamento...'}
        </h3>
        {Object.keys(deliveryStarted).length === 0 ? (
          deliveries.map((delivery: any, index: number) => {
            return (
              <div key={index} className='deliveries'>
                <div className='rowInfo'>
                  <p className='bold'>Restaurante: </p>
                  <p>{delivery.restaurant.nome}</p>
                </div>
                <div className='rowInfo'>
                  <p className='bold'>Endereço: </p>
                  <p>{`${delivery.restaurant.endereco}, ${delivery.restaurant.numero}`}</p>
                </div>
                <div className='rowInfo'>
                  <p className='bold'>N° do pedido: </p>
                  <p>Pedido #{delivery.orderId}</p>
                </div>
                <div className='rowInfo'>
                  <p className='bold'>Nome do cliente: </p>
                  <p>{delivery.customer.fullName}</p>
                </div>
                <div className='rowInfo'>
                  <p className='bold'>Endereço de entrega: </p>
                  <p>{`${delivery.customer.street}, ${delivery.customer.number}`}</p>
                </div>
                <div className='actionButtons'>
                  <button className='startPickup' onClick={() => startDelivery(delivery.id)}>
                    Iniciar entrega
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className='deliveries'>
            <div className='rowInfo'>
              <p className='bold'>Restaurante: </p>
              <p>{deliveryStarted.restaurant.nome}</p>
            </div>
            <div className='rowInfo'>
              <p className='bold'>Endereço: </p>
              <p>{`${deliveryStarted.restaurant.endereco}, ${deliveryStarted.restaurant.numero}`}</p>
            </div>
            <div className='rowInfo'>
              <p className='bold'>N° do pedido: </p>
              <p>Pedido #{deliveryStarted.orderId}</p>
            </div>
            <div className='rowInfo'>
              <p className='bold'>Nome do cliente: </p>
              <p>{deliveryStarted.customer.fullName}</p>
            </div>
            <div className='rowInfo'>
              <p className='bold'>Endereço de entrega: </p>
              <p>{`${deliveryStarted.customer.street}, ${deliveryStarted.customer.number}`}</p>
            </div>
            <div className='actionButtons'>
              <button className='finishDelivery' onClick={() => finishDelivery(deliveryStarted.id)}>
                Finalizar entrega
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default DeliveryPanel
