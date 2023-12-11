import React, { useState, useRef, useEffect } from 'react'
import { Container } from './styles'

import Cartao from '../../../../assets/cartao.png'
import CvvCartao from '../../../../assets/cartao_cvv.png'
import { useCart } from '../../../../hooks/useCart'
import { ConvertValue } from '../../../../helpers/convertValue'

import { useNavigate } from 'react-router-dom'
import { FloatLabel } from '../../../../styles/formGlobal'
import {
  FieldValuesCreditCard,
  schemaCreditCard,
} from '../../../../helpers/validations/validationCreditCard'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

export default function PagamentoCartao(customer: any) {
  const { payOrder } = useCart()

  const inputNumberCard = useRef(null)
  const inputValidadeCard = useRef(null)

  const navigate = useNavigate()

  const { cart } = useCart()

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

  const [isCvvInfo, setIsCvvInfo] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValuesCreditCard>({
    resolver: yupResolver(schemaCreditCard),
  })

  const onSubmit: SubmitHandler<FieldValuesCreditCard> = async (data) => {
    // console.log(data, customer.customer.infosCustomer)
    payOrder(customer.customer.infosCustomer, data)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className='formDadosCartao'>
        <FloatLabel className='col-12' onClick={() => setIsCvvInfo(false)}>
          <div className='form-group col-12'>
            <input
              type='text'
              id='creditCardHolder'
              placeholder=''
              {...register('creditCardHolder')}
            />
            <label htmlFor='creditCardHolder'>Nome impresso no cartão</label>
          </div>
          {errors.creditCardHolder && <p className='error'>{errors.creditCardHolder.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-12' onClick={() => setIsCvvInfo(false)}>
          <div className='form-group col-12'>
            <Controller
              name='creditCardNumber'
              control={control}
              render={({ field }) => (
                <IMaskInput
                  type='text'
                  id='creditCardNumber'
                  placeholder=''
                  mask={'0000 0000 0000 0000'}
                  {...field}
                  ref={inputNumberCard}
                />
              )}
            />
            <label htmlFor='creditCardNumber'>Número do cartão</label>
          </div>
          {errors.creditCardNumber && <p className='error'>{errors.creditCardNumber.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-9' onClick={() => setIsCvvInfo(false)}>
          <div className='form-group col-12'>
            <Controller
              name='creditCardExpiration'
              control={control}
              render={({ field }) => (
                <IMaskInput
                  type='text'
                  placeholder=''
                  id='creditCardExpiration'
                  mask={'00/00'}
                  {...field}
                  ref={inputValidadeCard}
                />
              )}
            />
            <label htmlFor='creditCardExpiration'>Vencimento (MM/AA)</label>
          </div>
          {errors.creditCardExpiration && (
            <p className='error'>{errors.creditCardExpiration.message}</p>
          )}
        </FloatLabel>

        <FloatLabel className='col-3' onClick={() => setIsCvvInfo(true)}>
          <div className='form-group col-12'>
            <input
              type='text'
              id='creditCardSecurityCode'
              placeholder=''
              {...register('creditCardSecurityCode')}
              maxLength={4}
            />
            <label htmlFor='creditCardSecurityCode'>CVV</label>
          </div>
          {errors.creditCardSecurityCode && (
            <p className='error'>{errors.creditCardSecurityCode.message}</p>
          )}
        </FloatLabel>

        <div className='finalizarPagamento'>
          <span className='mb-2'>
            Valor total:<strong>{ConvertValue(totalAmount)}</strong>
          </span>
          <button type='submit'>Pagar</button>
        </div>
      </form>
      <div className='iconCartao'>
        <img
          className={isCvvInfo ? 'rotate' : ''}
          src={isCvvInfo ? CvvCartao : Cartao}
          alt={isCvvInfo ? 'Cvv cartão' : 'Cartão'}
        />
      </div>
    </Container>
  )
}
