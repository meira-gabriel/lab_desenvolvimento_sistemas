import styled, { css } from 'styled-components'

interface ContainerProps {
  isMenuOpen: boolean
}

export const ContainerMenu = styled.aside<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.red};

  ${({ isMenuOpen }) =>
    isMenuOpen
      ? css`
          width: 13rem;
        `
      : css`
          width: 5.5rem;
        `}

  padding: 2rem 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: width 0.3s;

  button {
    background: none;
    width: 100%;
    border: none;

    svg {
      fill: ${({ theme }) => theme.colors.white};
      width: 1.8rem;
      height: 4rem;
    }
  }

  nav {
    flex: 1;
    width: 100%;
    height: 100%;

    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }

    li {
      a {
        width: fit-content;
        position: relative;
        padding-left: 1.5rem;
        padding-right: 1.5rem;

        display: flex;
        align-items: center;
        gap: 1.5rem;

        svg {
          fill: ${({ theme }) => theme.colors.white};
          width: 2.5rem;
          height: 3.5rem;
          transition: fill 0.3s;
        }

        span {
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        &.active {
          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            bottom: 0;
            transform: translateY(-50%);

            background-color: ${({ theme }) => theme.colors.yellow};
            width: 5px;
            height: calc(90%);

            border-radius: 0 5px 5px 0;
          }

          svg {
            fill: ${({ theme }) => theme.colors.yellow};
          }

          span {
            color: ${({ theme }) => theme.colors.yellow};
          }
        }
      }
    }
  }

  @media (max-width: 720px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;

    width: 100%;
    height: 5rem;
    overflow-y: auto;
    padding: 0 0;

    button {
      display: none;
    }

    nav {
      height: 100%;

      ul {
        flex-direction: row;
        align-items: center;
      }

      li {
        a {
          flex-direction: column;
          padding: 0rem;

          svg {
            width: 3rem;
            height: 3.25rem;
          }

          span {
            display: none;
          }

          &.active {
            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
`
