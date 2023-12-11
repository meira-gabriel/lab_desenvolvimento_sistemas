import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 2rem;
  display: flex;

  justify-content: space-between;

  .headerRestaurante {
    display: flex;
    gap: 1rem;
    align-items: center;

    img {
      margin: 0;
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .buttonAddProduct {
    align-items: center;
    display: flex;
  }

  .novoProduto {
    margin-top: 0.3rem;
    color: white;
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.red};
    border: none;
    font-weight: 500;
    padding: 10px 15px;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }

  .avaliacao {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.3rem;
    font-size: ${({ theme }) => theme.fontSize.md};

    .nota {
      color: ${({ theme }) => theme.colors.yellow};
      font-weight: 600;
    }

    svg {
      fill: ${({ theme }) => theme.colors.yellow};
    }
  }
`
