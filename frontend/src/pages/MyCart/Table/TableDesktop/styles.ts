import styled from 'styled-components'

export const Container = styled.main`
  background: ${({ theme }) => theme.colors.black};
  padding: 2rem 2.5rem;
  border-radius: 8px;

  table {
    width: 100%;
    border-spacing: 0 0;
    border-collapse: collapse;

    th {
      padding: 0 2rem 0.5rem 1.2rem;

      font-weight: 500;
      font-size: 1.125rem;
      text-transform: uppercase;
      text-align: left;

      &:nth-child(2) {
        padding-left: 2rem;
      }
    }

    td {
      padding: 1.5rem 1rem 1.5rem 1rem;
      padding-top: 1.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray600};

      h4 {
        margin-bottom: 0.5rem;
        font-weight: 400;
        font-size: 1.125rem;
      }

      > span {
        font-weight: 600;
        font-size: 1.5rem;
      }

      div {
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
            width: 1.25rem;
          }
        }
      }

      h5 {
        font-weight: 600;
        font-size: 1.5rem;
      }

      &:first-child {
        width: 6.5rem;
        padding-left: 0;
        padding-right: 0;

        img {
          object-fit: cover;
          width: 7rem;
          height: 7rem;
          border-radius: 8px;
        }
      }

      &:nth-child(2) {
        padding-left: 2rem;
      }

      &:last-child {
        width: 1.5rem;
        padding-right: 0;

        button {
          background: none;
          border: none;
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          svg {
            fill: ${({ theme }) => theme.colors.yellow};
            width: 1.75rem;
            height: 1.75rem;
          }
        }
      }
    }
  }
`
