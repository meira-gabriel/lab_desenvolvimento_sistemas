import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    justify-content: center;
    text-align: center;

    .metodoPagamentoEntrega {
        background: ${({ theme }) => theme.colors.gray900};
        width: 30rem;
        border-radius: 5px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        label {
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        label:last-child {
            border-top: 1px solid ${({ theme }) => theme.colors.gray700};
        }
    }

    button {
        width: 15rem;
        background: ${({ theme }) => theme.colors.redSecondary};
        color: ${({ theme }) => theme.colors.white};;
        border-radius: 5px;
        border: none;
        width: 10rem;
        margin: 1rem auto auto auto;
        padding: 0.5rem 1rem;

        &:hover {
            background: ${({ theme }) => theme.colors.red};
        }
    }
`