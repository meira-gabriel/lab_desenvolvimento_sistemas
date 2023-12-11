import React, { useState, useEffect } from 'react'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Container } from './styles'

import CheckIcon from '@mui/icons-material/Check'
import styled from 'styled-components'
import PaymentsIcon from '@mui/icons-material/Payments'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import StorefrontIcon from '@mui/icons-material/Storefront'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import HomeIcon from '@mui/icons-material/Home'

import { StepIconProps } from '@mui/material/StepIcon'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { useCart } from '../../hooks/useCart'
import { ConvertValue } from '../../helpers/convertValue'
import MapDelivery from './MapDelivery'
import { useNavigate } from 'react-router-dom'

const steps = [
  'Pagamento aprovado',
  'Preparando pedido',
  'Aguardando entregador',
  'Saiu para entrega',
  'Entrega finalizada',
]

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.colors.redSecondary,
      borderColor: theme.colors.redSecondary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.colors.redSecondary,
      borderColor: theme.colors.redSecondary,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: '3rem',
    width: '0.25rem',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    marginLeft: 10,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.colors.gray800,
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.colors.red} 0%, ${theme.colors.redSecondary} 50%, ${theme.colors.gray900} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 136deg, ${theme.colors.redSecondary} 0%, ${theme.colors.red} 50%, ${theme.colors.redSecondary} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: !completed ? <PaymentsIcon /> : <CheckIcon />,
    2: !completed ? <LunchDiningIcon /> : <CheckIcon />,
    3: !completed ? <StorefrontIcon /> : <CheckIcon />,
    4: !completed ? <DeliveryDiningIcon /> : <CheckIcon />,
    5: !completed ? <HomeIcon /> : <CheckIcon />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export default function DeliverySteps() {
  const navigate = useNavigate()
  const { duration, setDuration, deliveryFull, setDeliveryFull, startedDelivery } = useCart()

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const { cart } = useCart()

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

  const [distance, setDistance] = useState('')

  useEffect(() => {
    if (activeStep < 4) {
      const interval = setInterval(() => {
        handleNext()
      }, 5000)

      return () => {
        clearInterval(interval)
      }
    } else {
      return
    }
  }, [activeStep])

  useEffect(() => {
    if (startedDelivery) {
      handleNext()
    }
  }, [startedDelivery])

  useEffect(() => {
    if (deliveryFull) {
      handleNext()
      navigate('/inicio')
    }
  }, [deliveryFull])

  return (
    <Container>
      <Stepper activeStep={activeStep} orientation='vertical' connector={<ColorlibConnector />}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep < 4 ? (
        <div className='resumoPedido'>
          <h3>Resumo do Pedido: </h3>
          <div>
            {cart.map((produto) => {
              return (
                <ul key={produto.id}>
                  <li>
                    {`${produto.quantity} x`} - {produto.nome} - {ConvertValue(produto.subtotal)}
                    <span>{produto.descricao}</span>
                  </li>
                </ul>
              )
            })}
            <div className='rodapeResumo'>
              <strong>Valor total: {ConvertValue(totalAmount)}</strong>
            </div>
            <span>{'Obrigado pela preferência! :)'}</span>
          </div>
        </div>
      ) : (
        <div className='mapa' style={{ height: '400px', width: '100%' }}>
          <span>
            {deliveryFull ? 'Pedido entregue' : `Tempo estimado de entrega - ${duration}`}
          </span>
          <div>
            <MapDelivery
              setDistancia={setDistance}
              setDuracao={setDuration}
              setDeliveryFull={setDeliveryFull}
            />
          </div>
        </div>
      )}
    </Container>
  )
}
