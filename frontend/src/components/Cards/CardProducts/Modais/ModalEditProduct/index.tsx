/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import {
  FieldValuesEditProducts,
  schemaEditProducts,
} from '../../../../../helpers/validations/validationEditProduct'
import { ProductsData } from '../../../../../interfaces/productsData'
import { FloatLabel } from '../../../../../styles/formGlobal'
import { ModalEdit, Overlay } from '../../styles'

import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { ConvertValue } from '../../../../../helpers/convertValue'
import { IMaskInput } from 'react-imask'
import { useProducts } from '../../../../../hooks/useProducts'
import Loading from '../../../../Loading'

interface ModalEditProductProps {
  handleEditClick: any
  productInfo: ProductsData
}

export default function ModalEditProduct({ handleEditClick, productInfo }: ModalEditProductProps) {
  const inputPriceRef = useRef(null)

  const {
    dadosEnviados,
    setDadosEnviados,
    loading,
    setLoading,
    error,
    messageEnvio,
    confirmEditProduct,
    resetStatesProducts,
  } = useProducts()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValuesEditProducts>({
    resolver: yupResolver(schemaEditProducts),
    defaultValues: {
      nome: productInfo.nome,
      descricao: productInfo.descricao,
      preco: ConvertValue(productInfo.preco),
      categoria: productInfo.categoria,
    },
  })

  const initialValues = {
    id: productInfo.id,
    nome: productInfo.nome,
    descricao: productInfo.descricao,
    preco: ConvertValue(productInfo.preco),
    imageUrl: productInfo.imageUrl,
    categoria: productInfo.categoria,
  }

  const [imageProduct, setImageProduct] = useState(productInfo.imageUrl)
  const [erroEdit, setErroEdit] = useState('')

  function deepEqual(obj1: any, obj2: any) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!deepEqual(obj1[key], obj2[key])) {
          return false
        }
      } else if (obj1[key] !== obj2[key]) {
        return false
      }
    }

    return true
  }

  const onSubmit: SubmitHandler<FieldValuesEditProducts> = (data) => {
    setLoading(true)

    const editedData = {
      ...data,
      id: productInfo.id,
      imageUrl: imageProduct,
    }

    if (deepEqual(initialValues, editedData)) {
      setErroEdit('Nenhuma informação alterada')
    } else {
      setDadosEnviados(true)

      const numberPreco = editedData.preco
        .replace(/[^\d,.-]/g, '')
        .replace(/,/g, '.')
        .replace(/(\..*)\./g, '$1')
      const dataFinal = {
        ...editedData,
        preco: +numberPreco,
      }

      confirmEditProduct(dataFinal)
      setTimeout(() => {
        handleEditClick(null)
      }, 5000)
      setErroEdit('')
    }
  }

  function closeModal() {
    handleEditClick(null)
    resetStatesProducts()
  }

  return (
    <>
      {dadosEnviados ? (
        <>
          <Overlay onClick={closeModal}></Overlay>
          <ModalEdit>
            <Loading error={error} loading={loading} message={messageEnvio} onClose={closeModal} />
          </ModalEdit>
        </>
      ) : (
        <>
          <Overlay onClick={() => handleEditClick(null)}></Overlay>
          <ModalEdit>
            <h3>Editar produto</h3>
            <div className='changeImage'>
              <label htmlFor='imageInput' className='image-container'>
                <img src={imageProduct} alt={productInfo.nome} className='edit-image' />
              </label>
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    setImageProduct(imageUrl)
                  }
                }}
              />
            </div>
            <form className='formModify' onSubmit={handleSubmit(onSubmit)}>
              <FloatLabel className='col-6'>
                <div className='form-group col-12'>
                  <input type='text' id='nomeProduto' placeholder='' {...register('nome')} />
                  <label htmlFor='nomeProduto'>Nome</label>
                </div>
                {errors.nome && <p className='error'>{errors.nome.message}</p>}
              </FloatLabel>
              <FloatLabel className='col-6'>
                <div className='form-group col-12'>
                  <Controller
                    name='preco'
                    control={control}
                    render={({ field }) => (
                      <IMaskInput
                        type='text'
                        placeholder=''
                        id='preco'
                        mask={'R$ 00,00'}
                        {...field}
                        ref={inputPriceRef}
                      />
                    )}
                  />
                  <label htmlFor='preco'>Preço</label>
                </div>
                {errors.preco && <p className='error'>{errors.preco.message}</p>}
              </FloatLabel>
              <FloatLabel className='col-6'>
                <div className='form-group col-12'>
                  <input
                    type='text'
                    id='categoriaProduto'
                    placeholder=''
                    {...register('categoria')}
                  />
                  <label htmlFor='categoriaProduto'>Categoria</label>
                </div>
                {errors.categoria && <p className='error'>{errors.categoria.message}</p>}
              </FloatLabel>
              <FloatLabel className='col-6'>
                <div className='form-group col-12'>
                  <input
                    type='text'
                    id='descricaoProduto'
                    placeholder=''
                    {...register('descricao')}
                  />
                  <label htmlFor='descricaoProduto'>Descrição</label>
                </div>
                {errors.descricao && <p className='error'>{errors.descricao.message}</p>}
              </FloatLabel>
              <div>
                {erroEdit && Object.keys(errors).length === 0 && (
                  <p className='infoError'>{erroEdit}</p>
                )}
              </div>
              <div>
                <button type='submit'>Salvar</button>
              </div>
            </form>
          </ModalEdit>
        </>
      )}
    </>
  )
}
