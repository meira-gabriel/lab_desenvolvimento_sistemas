import styled from 'styled-components'

export const Container = styled.div`
  > div {
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 500;

    svg {
      width: 3rem;
      height: 3rem;
    }

    .loading {
      border: 4px solid #f3f3f3;
      border-top: 4px solid ${({ theme }) => theme.colors.yellow};
      border-radius: 50%;
      width: 2.3rem;
      height: 2.3rem;
      animation: spin 0.8s linear infinite;
      transform: translate(-50%, -50%);
    }
  }

  .errorMessage {
    color: ${({theme}) => theme.colors.redSecondary}
  }

  .successMessage {
    color: ${({theme}) => theme.colors.yellow}
  }
`
