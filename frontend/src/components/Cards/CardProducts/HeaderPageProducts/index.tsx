/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { RestaurantsData } from '../../../../interfaces/restaurantsData'
import { Container } from './styles'
import { useAccount } from '../../../../hooks/useAccount'
import ModalAddProduct from '../Modais/ModalAddProduct'

interface HeaderPageProductsProps {
  restaurante: RestaurantsData
}

export default function HeaderPageProducts({ restaurante }: HeaderPageProductsProps) {
  const { idAdmin } = useAccount()

  const [showModalAdd, setShowModalAdd] = useState(false)

  const handleAddClick = (): any => {
    setShowModalAdd(!showModalAdd)
  }

  return (
    <>
      <Container>
        {restaurante || idAdmin !== 0 ? (
          <>
            <div className='headerRestaurante'>
              <img src={restaurante?.imageUrl} alt={restaurante?.nome}></img>
              <h2>{restaurante?.nome}</h2>
              <div className='avaliacao'>
                <AiFillStar /> <span className='nota'>{restaurante?.nota}</span>
              </div>
            </div>
            {idAdmin !== 0 && (
              <div className='buttonAddProduct'>
                <button className='novoProduto' onClick={handleAddClick}>
                  Adicionar produto
                </button>
              </div>
            )}
          </>
        ) : (
          <h2>Produtos em destaque</h2>
        )}
      </Container>
      {showModalAdd && <ModalAddProduct handleAddClick={handleAddClick}></ModalAddProduct>}
    </>
  )
}
