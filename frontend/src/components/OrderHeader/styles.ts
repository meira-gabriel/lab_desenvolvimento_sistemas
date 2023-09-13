import styled from 'styled-components'

export const Container = styled.header`
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 10rem;
  }

  > div {
    background: none;
    border: none;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    div {
      text-align: right;

      h3 {
        margin-bottom: 0.125rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.white};
      }

      span {
        color: ${({ theme }) => theme.colors.yellow};

        strong {
          font-weight: 500;
          font-size: 1.25rem;
        }
      }
    }

    svg {
      flex-shrink: 0;
      fill: ${({ theme }) => theme.colors.white};
      width: 2.875rem;
      height: 2.875rem;
    }
  }
`
