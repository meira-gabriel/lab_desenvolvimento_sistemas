import styled from "styled-components";

export const Container = styled.div`
    width: 90%;
    border: 1px solid ${({ theme }) => theme.colors.gray800};
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0 auto;
    justify-content: center;
    display: flex;
    align-items: center;

    .formDadosCartao {
        max-width: 50%;
        justify-content: center;
        padding: 10px;
        align-items: center;
        text-align: center;

        .finalizarPagamento {
            flex-direction: column;
            display: flex;

            strong {
                margin-left: 5px;
            }
        }

        button { 
                width: 15rem;
                background: ${({ theme }) => theme.colors.redSecondary};
                color: ${({ theme }) => theme.colors.white};;
                border-radius: 5px;
                border: none;
                width: 10rem;
                margin: 0 auto;
                padding: 0.5rem 1rem;

                &:hover {
                    background: ${({ theme }) => theme.colors.red};
                }
            }
    }

    .iconCartao {
        position: relative;
        border-left: 1px solid ${({ theme }) => theme.colors.gray700};
        padding: 10px;
        justify-content: center;
        text-align: center;
        align-items: center;

        img {
            max-width: 80%;
            align-self: center;
            transition: transform 0.5s ease;
        }
    }

    .rotate {
        transform: rotateY(180deg);
    }
`