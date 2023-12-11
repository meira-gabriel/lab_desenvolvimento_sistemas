import React from 'react'
import { Container } from './styles'
import Head from '../../components/Head'
import { OrderHeader } from '../../components/OrderHeader'
import DeliverySteps from '../../components/DeliverySteps'

export default function TrackDelivery() {
    return (
        <Container>
            <Head title='Carrinho' />
            <OrderHeader />
            <DeliverySteps />
        </Container>
    )
}