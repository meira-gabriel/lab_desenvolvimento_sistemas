import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../../../hooks/useCart'

import { ConfirmOrder } from '../../../../components/ConfirmOrder'

import { ConvertValue } from '../../../../helpers/convertValue'

import minusImg from '../../../../assets/circle-minus.svg'
import plusImg from '../../../../assets/circle-plus.svg'

import { Container } from './style'

export function TableMobile() {
  const { cart, removeProductFromCart, productCartIncrement, productCartDecrement } = useCart()

  return (
    <Container>
      {cart.map((item) => (
        <div key={`${item.nome}-${item.id}`} className='order-item'>
          <div>
            <img src={item.imageUrl} alt={item.nome} />
          </div>
          <div>
            <h4>
              <span>{item.nome}:</span> {ConvertValue(item.preco)}
            </h4>

            <div>
              <div>
                <button type='button' onClick={() => productCartDecrement(item)}>
                  <img src={minusImg} alt='Remover quantidade' />
                </button>
                <span>{`${item.quantity}`.padStart(2, '0')}</span>
                <button type='button' onClick={() => productCartIncrement(item)}>
                  <img src={plusImg} alt='Adicionar quantidade' />
                </button>
              </div>
              <button type='button' className="buttonRemove" onClick={() => removeProductFromCart(item)}>
                <DeleteIcon />
              </button>
            </div>
            <h5>
              <span>Subtotal:</span> {ConvertValue(item.subtotal)}
            </h5>
          </div>
        </div>
      ))}

      <ConfirmOrder />
    </Container>
  )
}
