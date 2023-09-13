import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 1.25rem 0.5rem;

  h2 {
    max-width: 500px;
    font-size: 2rem;
  }

  img {
    width: 100%;
    max-width: 32rem;
  }
`

export const Button = styled(Link)`
  display: block;

  background: ${({ theme }) => theme.colors.red};
  width: 100%;
  max-width: 13rem;
  height: 3rem;

  border-radius: 8px;
  margin: 1rem 0 3rem;

  font-weight: 500;
  font-size: 1.25rem;
  line-height: 3rem;

  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.redSecondary};
  }
`
