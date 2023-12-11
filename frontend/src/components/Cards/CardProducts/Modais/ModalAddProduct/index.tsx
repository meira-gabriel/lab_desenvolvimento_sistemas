/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { FloatLabel } from '../../../../../styles/formGlobal'
import { ModalAdd, Overlay } from '../../styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { IMaskInput } from 'react-imask'
import {
  FieldValuesAddProducts,
  schemaAddProducts,
} from '../../../../../helpers/validations/validationAddProduct'
import { useAccount } from '../../../../../hooks/useAccount'
import Loading from '../../../../Loading'
import { useProducts } from '../../../../../hooks/useProducts'

interface ModalAddProductProps {
  handleAddClick: any
}

export default function ModalAddProduct({ handleAddClick }: ModalAddProductProps) {
  const inputPriceRef = useRef(null)

  const { idAdmin } = useAccount()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [imageRequired, setImageRequired] = useState(false)

  const {
    dadosEnviados,
    setDadosEnviados,
    loading,
    setLoading,
    error,
    messageEnvio,
    registerNewProduct,
    resetStatesProducts,
  } = useProducts()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValuesAddProducts>({
    resolver: yupResolver(schemaAddProducts),
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setImageRequired(false)
      setShowRemoveButton(true)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setShowRemoveButton(false)
  }

  const onSubmit: SubmitHandler<FieldValuesAddProducts> = (data) => {
    setLoading(true)

    const precoFinal = data.preco
      .replace(/[^\d,.-]/g, '')
      .replace(/,/g, '.')
      .replace(/(\..*)\./g, '$1')

    if (selectedImage) {
      setDadosEnviados(true)
      const dataFinal = {
        ...data,
        id: 0,
        preco: +precoFinal,
        idRestaurante: idAdmin,
        imageUrl: selectedImage,
      }

      registerNewProduct(dataFinal)
      setTimeout(() => {
        handleAddClick(null)
      }, 5000)
    } else {
      setImageRequired(true)
    }
  }

  function closeModal() {
    handleAddClick(null)
    resetStatesProducts()
  }

  return (
    <>
      {dadosEnviados ? (
        <>
          <Overlay onClick={closeModal}></Overlay>
          <ModalAdd>
            <Loading error={error} loading={loading} message={messageEnvio} onClose={closeModal} />
          </ModalAdd>
        </>
      ) : (
        <>
          <Overlay onClick={() => handleAddClick(null)}></Overlay>
          <ModalAdd>
            <h3>Cadastrar produto</h3>
            <div className='selectImage'>
              <label htmlFor='imageInput'>
                {selectedImage ? (
                  <div className='imagemProduto'>
                    <img src={selectedImage} alt='Selected' />
                  </div>
                ) : (
                  <div className='imagemProduto'>
                    <IoMdAdd></IoMdAdd>
                  </div>
                )}
                {imageRequired && <p className='errorImage'>{'A imagem é obrigatória'}</p>}
              </label>
              <input
                type='file'
                id='imageInput'
                accept='image/*'
                style={{ display: 'none' }}
                {...register('imageUrl')}
                onChange={handleImageChange}
              />
            </div>
            {showRemoveButton && (
              <button className='removeImage' onClick={handleRemoveImage}>
                Remover imagem
              </button>
            )}
            <div className='formModify'>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                <FloatLabel className='col-12'>
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
                <FloatLabel className='col-12'>
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
                <button type='submit'>Cadastrar</button>
              </form>
            </div>
          </ModalAdd>
        </>
      )}
    </>
  )
}
