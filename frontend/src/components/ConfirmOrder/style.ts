import styled from 'styled-components'

export const Container = styled.footer`
  padding-top: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: ${({ theme }) => theme.colors.redSecondary};
    width: 100%;
    max-width: 13rem;
    min-height: 3.5rem;

    border: none;
    border-radius: 8px;

    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};

    transition: background 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.red};
    }
  }

  span {
    font-weight: 500;
    text-transform: uppercase;

    strong {
      margin-left: 0.75rem;
      font-weight: 700;
      font-size: 1.8rem;
    }
  }

  @media (max-width: 540px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;

    button {
      max-width: 100%;
    }

    span {
      margin-bottom: 2rem;

      strong {
        font-size: 2.2rem;
      }
    }
  }
`
