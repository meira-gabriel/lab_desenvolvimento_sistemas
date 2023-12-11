import styled from 'styled-components'

export const Container = styled.div`
  .carrinho {
    display: none;
  }

  a {
    margin: 0 auto;
  }

  width: 100%;
  max-width: 58.75rem;
  padding: 2rem;
  margin: 0 auto;

  > div {
    background: ${({ theme }) => theme.colors.black};
    border-radius: 10px;
    padding: 1rem 1.5rem;
    align-items: center;
    justify-content: center;

    .error {
      float: left;
      color: ${({ theme }) => theme.colors.red};
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin-top: 0.3rem;
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSize['3xl']};
      margin-bottom: 1rem;
      text-align: center;
    }

    .infosEntrega {
      width: 80%;
      margin: 0 auto;
      align-self: center;
      text-align: center;

      h4 {
        text-align: left;
        margin: 15px 5px;
      }

      button {
        width: 10rem;
        background: ${({ theme }) => theme.colors.redSecondary};
        color: ${({ theme }) => theme.colors.white};
        border-radius: 5px;
        border: none;
        width: 10rem;
        margin: 1rem auto;
        padding: 0.5rem 1rem;

        &:hover {
          background: ${({ theme }) => theme.colors.red};
        }
      }
    }

    .inserirInfos {
      justify-content: space-around;
      text-align: center;
      align-items: center;
      display: flex;

      .checkbox {
        input {
          margin-right: 5px;
        }
      }
    }

    .tabs {
      gap: 1rem;

      .MuiTabs-indicator {
        background-color: ${({ theme }) => theme.colors.yellow};
      }

      .Mui-selected {
        color: ${({ theme }) => theme.colors.yellow};
      }

      button:last-child {
        border: none;
        margin: 0;
      }

      button {
        border-right: 1px solid ${({ theme }) => theme.colors.gray600};
        color: white;
        background-color: ${({ theme }) => theme.colors.gray900};
        font-family: Montserrat;
      }
    }
  }
`
