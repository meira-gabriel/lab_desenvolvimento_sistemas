import { ConvertValue } from "../../../helpers/convertValue"
import { Container } from "./styles"
import { IoMdAdd } from 'react-icons/io'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import { CardsData } from "../../../interfaces/cardsData"
import { useCart } from "../../../hooks/useCart"

interface CardProductsProps {
    productInfos: CardsData[]
    tipoUser: string
}

export default function CardProducts({ productInfos, tipoUser }: CardProductsProps) {
    const { cart, addProductIntoCart } = useCart()
    return (
        <Container>
            {productInfos.map((product) => {
                const productExistent = cart.find(
                    (item) => item.nome === product.nome && item.id === product.id,
                )

                return (
                    <div key={product.id}>
                        {productExistent && <span className="quantityProduct">{productExistent.quantity}</span>}
                        <h3>{product.nome}</h3>

                        <img src={`/imgs/${product.imagem}`} alt={product.nome}></img>

                        <span>{product.descricao}</span>

                        <div>
                            <strong>{ConvertValue(product.preco)}</strong>
                            {tipoUser === "usuario" ?
                                <button onClick={() => addProductIntoCart(product)}> <IoMdAdd /> </button>
                                :
                                <div className="iconsModify">
                                    <FaRegEdit className="iconEdit" />
                                    <FaTrashAlt className="iconDelete" />
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}