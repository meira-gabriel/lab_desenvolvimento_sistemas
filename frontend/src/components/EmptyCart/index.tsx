import { Button, Container } from './styles'

import manAndBurgerImg from '../../assets/man-and-burger.svg'

interface EmptyCartProps {
  title: string
}

export function EmptyCart({ title }: EmptyCartProps) {
  return (
    <Container>
      <h2>{title}</h2>
      <Button to='/Produtos'>Checar os produtos</Button>
      <img src={manAndBurgerImg} alt='Homem com hambúrguer' />
    </Container>
  )
}
