import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  gap: 1.5rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  > div {
    position: relative;
    background: ${({ theme }) => theme.colors.black};
    padding: 1.5rem 1.3rem;
    border-radius: 10px;

    .quantityProduct {
      position: absolute;
      top: -0.5rem;
      left: -0.5rem;

      background: ${({ theme }) => theme.colors.red};
      width: 2rem;
      height: 2rem;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 500;
      font-size: 1.125rem;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 1.5rem;
      text-align: center;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 12rem;
      border-radius: 5px;
      margin-bottom: 0.5rem;
    }

    .avatar {
      width: 2rem;
      height: 2rem;
      img {
        width: 35px;
        height: 35px;
        margin: 0 auto;
        align-items: center;
      }
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.md};
    }

    > div {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      strong {
        font-size: 1.2rem;
      }

      button {
        background: ${({ theme }) => theme.colors.red};
        border: none;
        border-radius: 50%;
        height: 2.5rem;
        width: 2.5rem;
        align-items: center;
        justify-content: center;
        display: flex;

        svg {
          fill: ${({ theme }) => theme.colors.white};
        }

        &:hover {
          background: ${({ theme }) => theme.colors.redSecondary};
        }
      }

      .iconsModify {
        display: flex;
        gap: 0.5rem;

        svg {
          width: 1.3rem;
          height: 1.3rem;
          cursor: pointer;
        }

        .iconEdit {
          fill: ${({ theme }) => theme.colors.white};
        }

        .iconDelete {
          fill: ${({ theme }) => theme.colors.red};
        }
      }
    }

    .iconRestaurante {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .buttonCardapio {
      background: ${({ theme }) => theme.colors.red};
      border: none;
      border-radius: 5px;
      padding: 0.8rem 2rem;
      color: ${({ theme }) => theme.colors.white};
      margin: 0.5rem auto;
      display: block;
    }
  }
`

const BaseModal = styled.div`
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.black};
  padding: 20px;
  z-index: 11;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  h3 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    margin-bottom: 1rem;
  }

  img {
    margin: 0 auto;
    display: flex;
    border-radius: 5px;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  button {
    margin: 0.5rem auto;
    display: flex;
    border: none;
    background: ${({ theme }) => theme.colors.red};
    border-radius: 5px;
    color: white;
    padding: 10px 15px;
    font-weight: 500;
  }

  .error {
    float: left;
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  .errorImage {
    float: left;
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.78rem;
  }

  .infoError {
    color: ${({ theme }) => theme.colors.red};
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 0 5px;
  }

  /* .progressBar {
    background: ${({ theme }) => theme.colors.red};
    height: 1rem;
    position: absolute;
    bottom: 0;
    padding: 0;
  } */
`

export const ModalEdit = styled(BaseModal)`
  .changeImage {
    max-width: 10rem;
    max-height: 10rem;
    margin: 0 auto;
  }

  label {
    cursor: pointer;
  }
`

export const ModalDelete = styled(BaseModal)`
  text-align: center;

  .buttonsDelete {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
      margin: 0;
    }

    .buttonCancel {
      background: ${({ theme }) => theme.colors.gray600};
    }
  }
`

export const ModalAdd = styled(BaseModal)`
  .selectImage {
    max-width: 10rem;
    max-height: 10rem;
    margin: 0 auto;
  }

  .removeImage {
    background: ${({ theme }) => theme.colors.gray600};
    padding: 5px 10px;
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-bottom: 1rem;
  }

  .imagemProduto {
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    border-radius: 5px;
    width: 10rem;
    height: 10rem;
    background: ${({ theme }) => theme.colors.gray600};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    cursor: pointer;

    img {
      margin-bottom: 0;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.gray700};
    }

    svg {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
    }
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f9f9f9; /* Um fundo semitransparente */
  opacity: 15%;
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
`
