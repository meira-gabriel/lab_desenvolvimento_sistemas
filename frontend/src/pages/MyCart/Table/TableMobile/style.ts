import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .order-item {
    background: ${({ theme }) => theme.colors.black};
    padding: 1.75rem 1.5rem;
    border-radius: 4px;

    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1.5rem;

    > div:first-child {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h4 {
        margin-bottom: 0.5rem;
        font-weight: 400;
        font-size: 1.75rem;
      }

      > span {
        font-weight: 600;
        font-size: 1.7rem;
      }

      div {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin: 0.875rem 0;

        div {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          button {
            background: none;
            flex: 0;
            border: none;

            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 1.5rem;
            }
          }

          span {
            display: block;
            background: ${({ theme }) => theme.colors.white};
            padding: 0.125rem 0.75rem;
            border-radius: 4px;

            font-weight: 500;
            font-size: 1.5rem;
            color: ${({ theme }) => theme.colors.black};
          }
        }

        button {
          flex-shrink: 0;
          background: none;
          border: none;

          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            fill: ${({ theme }) => theme.colors.yellow};
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }

      h5 {
        span {
          display: block;
          font-size: 1.5rem;
          font-weight: 400;
        }

        font-weight: 700;
        font-size: 2rem;
      }
    }

    @media (max-width: 540px) {
      grid-template-columns: 1fr;
      padding: 1rem;
      text-align: center;

      > div:first-child {
        height: 10rem;
      }

      > div:last-child {
        div {
          gap: 2rem;
          justify-content: center;
          display: block;

          .buttonRemove {
            margin: 0.5rem auto;
          }
        }

        h5 {
          span {
            font-size: 1.5rem;
          }

          font-size: 2rem;
        }
      }
    }
  }
`
