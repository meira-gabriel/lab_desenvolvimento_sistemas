/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { ConvertValue } from '../../../helpers/convertValue'
import { Container } from './styles'
import { IoMdAdd } from 'react-icons/io'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import { ProductsData } from '../../../interfaces/productsData'
import { useCart } from '../../../hooks/useCart'
import { useProducts } from '../../../hooks/useProducts'
import { Avatar } from '@mui/material'
import { RestaurantsData } from '../../../interfaces/restaurantsData'
import { Link } from 'react-router-dom'
import { useAccount } from '../../../hooks/useAccount'
import ModalEditProduct from './Modais/ModalEditProduct'
import ModalDeleteProduct from './Modais/ModalDeleteProduct'

interface CardProductsProps {
  productInfos: ProductsData[]
  tipoUser: string
  restaurantInfos: RestaurantsData
}

function limitDescription(description: string, maxLength = 100) {
  if (description.length <= maxLength) {
    return description
  } else {
    return description.substring(0, maxLength) + '...'
  }
}

export default function CardProducts({
  productInfos,
  tipoUser,
  restaurantInfos,
}: CardProductsProps) {
  const { cart, addProductIntoCart } = useCart()
  const { idAdmin } = useAccount()
  const { restaurants } = useProducts()

  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [productInfo, setEditProductInfo] = useState<ProductsData>()

  const handleEditClick = (product: any): any => {
    setEditProductInfo(product)
    setShowModalEdit(!showModalEdit)
  }

  const handleDeleteClick = (product: any): any => {
    setEditProductInfo(product)
    setShowModalDelete(!showModalDelete)
  }

  let filteredProducts = productInfos

  if (idAdmin !== 0) {
    filteredProducts = productInfos.filter((product) => product.idRestaurante === idAdmin)
  }

  return (
    <>
      <Container>
        {filteredProducts.map((product) => {
          const productExistent = cart.find(
            (item) => item.nome === product.nome && item.id === product.id,
          )

          const restaurant = restaurants.find((r) => r.id === product.idRestaurante)

          return (
            <div key={product.id}>
              {productExistent && (
                <span className='quantityProduct'>{productExistent.quantity}</span>
              )}
              <h3>{product.nome}</h3>

              <img src={product.imageUrl} alt={product.nome}></img>

              <span className='productDescription'>{limitDescription(product.descricao)}</span>

              <div>
                <span className='iconRestaurante'>
                  {!restaurantInfos && idAdmin === 0 && (
                    <Link to={`/produtos/${restaurant?.nome}`}>
                      <Avatar
                        className='avatar'
                        src={restaurant?.imageUrl}
                        alt={restaurant?.nome}
                      />
                    </Link>
                  )}
                  <strong>{ConvertValue(product.preco)}</strong>
                </span>
                {tipoUser === 'usuario' ? (
                  <button onClick={() => addProductIntoCart(product)}>
                    <IoMdAdd />
                  </button>
                ) : (
                  <div className='iconsModify'>
                    <FaRegEdit className='iconEdit' onClick={() => handleEditClick(product)} />
                    <FaTrashAlt className='iconDelete' onClick={() => handleDeleteClick(product)} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </Container>
      {showModalEdit && productInfo && (
        <ModalEditProduct
          handleEditClick={handleEditClick}
          productInfo={productInfo}
        ></ModalEditProduct>
      )}
      {showModalDelete && productInfo && (
        <ModalDeleteProduct
          handleDeleteClick={handleDeleteClick}
          productInfo={productInfo}
        ></ModalDeleteProduct>
      )}
    </>
  )
}
