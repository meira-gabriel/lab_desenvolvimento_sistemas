import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.black};
  padding: 10px;
  border-radius: 5px;
  width: 50rem;
  margin: 0 auto;

  .headerPainel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    h3 {
      color: ${({ theme }) => theme.colors.yellow};
    }

    div {
      display: flex;
      align-items: center;
      span {
        margin-right: 0.5rem;
        font-weight: 600;
      }
    }
  }

  .deliveryInfo {
    background: ${({ theme }) => theme.colors.gray400};
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 35rem;
    overflow-y: auto;

    h3 {
      color: ${({ theme }) => theme.colors.black};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.black};
    }

    .deliveries {
      gap: 0.3rem;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.4);
      background: ${({ theme }) => theme.colors.gray500};
    }

    .rowInfo {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      .bold {
        font-weight: 600;
      }
    }
  }

  .actionButtons {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      color: ${({ theme }) => theme.colors.white};
      font-weight: 600;
      cursor: pointer;
    }

    .startPickup {
      background: ${({ theme }) => theme.colors.indigo};
    }

    .finishDelivery {
      background: ${({ theme }) => theme.colors.red};
    }
  }
`
