import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../../../hooks/useCart'

import { ConfirmOrder } from '../../../../components/ConfirmOrder'

import { ConvertValue } from '../../../../helpers/convertValue'

import minusImg from '../../../../assets/circle-minus.svg'
import plusImg from '../../../../assets/circle-plus.svg'

import { Container } from './styles'

export function TableDesktop() {
  const { cart, removeProductFromCart, productCartIncrement, productCartDecrement } = useCart()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={`${item.nome}-${item.id}`}>
              <td>
                <img src={item.imageUrl} alt={item.nome} />
              </td>
              <td>
                <h4>{item.nome}</h4>
                <span>{ConvertValue(item.preco)}</span>
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => productCartDecrement(item)}>
                    <img src={minusImg} alt='Remover quantidade' />
                  </button>
                  <span>{`${item.quantity}`.padStart(2, '0')}</span>
                  <button type='button' onClick={() => productCartIncrement(item)}>
                    <img src={plusImg} alt='Adicionar quantidade' />
                  </button>
                </div>
              </td>
              <td>
                <h5>{ConvertValue(item.subtotal)}</h5>
              </td>
              <td>
                <button type='button' onClick={() => removeProductFromCart(item)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmOrder />
    </Container>
  )
}
