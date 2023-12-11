import { useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValuesAddress, schemaAddress } from '../../../helpers/validations/validationAddress'
import { FloatLabel } from '../../../styles/formGlobal'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

interface InfosEntregaProps {
  setInfosEntrega: (value: React.SetStateAction<boolean>) => void
  setInfosCustomer: (value: React.SetStateAction<object>) => void
}

export default function InfosEntrega({ setInfosEntrega, setInfosCustomer }: InfosEntregaProps) {
  const inputCep = useRef(null)
  const inputPhone = useRef(null)
  const inputCpf = useRef(null)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValuesAddress>({
    resolver: yupResolver(schemaAddress),
  })

  const onSubmit: SubmitHandler<FieldValuesAddress> = (data) => {
    if (Object.keys(errors).length === 0) {
      setInfosEntrega(false)
      setInfosCustomer(data)
    }
  }

  return (
    <>
      <h3>Informações de entrega</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='infosEntrega'>
        <h4>Dados pessoais:</h4>
        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <input type='text' id='fullName' placeholder='' {...register('fullName')} />
            <label htmlFor='fullName'>Nome completo</label>
          </div>
          {errors.fullName && <p className='error'>{errors.fullName.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <input type='text' id='email' placeholder='' {...register('email')} />
            <label htmlFor='email'>E-mail</label>
          </div>
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <Controller
              name='mobile'
              control={control}
              render={({ field }) => (
                <IMaskInput
                  type='tel'
                  id='mobile'
                  autoComplete='phone'
                  mask={'(00) 90000-0000'}
                  placeholder=''
                  {...field}
                  ref={inputPhone}
                />
              )}
            />
            <label htmlFor='mobile'>Telefone</label>
          </div>
          {errors.mobile && <p className='error'>{errors.mobile.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <Controller
              name='document'
              control={control}
              render={({ field }) => (
                <IMaskInput
                  type='text'
                  id='document'
                  placeholder=''
                  mask={[{ mask: '000.000.000-00' }, { mask: '00.000.000/0000-00' }]}
                  {...field}
                  ref={inputCpf}
                />
              )}
            />
            <label htmlFor='document'>CPF/CNPJ</label>
          </div>
          {errors.document && <p className='error'>{errors.document.message}</p>}
        </FloatLabel>

        <h4>Dados do endereço:</h4>

        <FloatLabel className='col-3'>
          <div className='form-group col-12'>
            <Controller
              name='zipCode'
              control={control}
              render={({ field }) => (
                <IMaskInput
                  type='text'
                  placeholder=''
                  id='zipCode'
                  mask={'00000-000'}
                  {...field}
                  ref={inputCep}
                />
              )}
            />
            <label htmlFor='zipCode'>CEP</label>
          </div>
          {errors.zipCode && <p className='error'>{errors.zipCode.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-4'>
          <div className='form-group col-12'>
            <input type='text' id='state' placeholder='' {...register('state')} />
            <label htmlFor='state'>Estado</label>
          </div>
          {errors.state && <p className='error'>{errors.state.message}</p>}
        </FloatLabel>
        <FloatLabel className='col-5'>
          <div className='form-group col-12'>
            <input type='text' id='city' placeholder='' {...register('city')} />
            <label htmlFor='city'>Cidade</label>
          </div>
          {errors.city && <p className='error'>{errors.city.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <input type='text' id='neighborhood' placeholder='' {...register('neighborhood')} />
            <label htmlFor='neighborhood'>Bairro</label>
          </div>
          {errors.neighborhood && <p className='error'>{errors.neighborhood.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-6'>
          <div className='form-group col-12'>
            <input type='text' id='complement' placeholder='' {...register('complement')} />
            <label htmlFor='complement'>Complemento</label>
          </div>
        </FloatLabel>

        <FloatLabel className='col-9'>
          <div className='form-group col-12'>
            <input type='text' id='street' placeholder='' {...register('street')} />
            <label htmlFor='street'>Endereço</label>
          </div>
          {errors.street && <p className='error'>{errors.street.message}</p>}
        </FloatLabel>

        <FloatLabel className='col-3'>
          <div className='form-group col-12'>
            <input type='text' id='number' placeholder='' {...register('number')} />
            <label htmlFor='number'>N°</label>
          </div>
          {errors.number && <p className='error'>{errors.number.message}</p>}
        </FloatLabel>
        <button type='submit'>Pagamento</button>
      </form>

      <div className='inserirInfos'>
        {/* <div className='checkbox'>
          <input type='checkbox' id='saveInfos' name='saveInfos' />
          <label htmlFor='saveInfos'>Salvar informações</label>
        </div> */}

        <div></div>
      </div>
    </>
  )
}
