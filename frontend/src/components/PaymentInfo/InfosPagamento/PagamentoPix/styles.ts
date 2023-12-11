import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    align-items: center;

    img {
        width: 20rem;
    }

    .finalizarPagamento {
        flex-direction: column;
        display: flex;

        strong {
            margin-left: 5px;
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
    }
`