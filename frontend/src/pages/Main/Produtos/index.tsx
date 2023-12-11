import CardProducts from '../../../components/Cards/CardProducts'
import HeaderPageProducts from '../../../components/Cards/CardProducts/HeaderPageProducts'
import Head from '../../../components/Head'
import { useAccount } from '../../../hooks/useAccount'
import { useProducts } from '../../../hooks/useProducts'
import { useParams } from 'react-router-dom'

interface TipoUsuarioProps {
  tipoUsuario: string
}

export default function Produtos({ tipoUsuario }: TipoUsuarioProps) {
  const { products, restaurants } = useProducts()
  const { nomeRestaurante } = useParams()
  const { idAdmin } = useAccount()

  const restaurante =
    idAdmin === 0
      ? restaurants.filter((restaurant) => restaurant.nome === nomeRestaurante)[0]
      : restaurants.filter((restaurant) => restaurant.id === idAdmin)[0]

  const productsFinal = nomeRestaurante
    ? products.filter((product) => product.idRestaurante === restaurante.id)
    : products

  return (
    <>
      <Head title='Produtos'></Head>
      <HeaderPageProducts restaurante={restaurante} />
      <CardProducts
        productInfos={productsFinal}
        tipoUser={tipoUsuario}
        restaurantInfos={restaurante}
      ></CardProducts>
    </>
  )
}
