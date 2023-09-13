import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, auto));
    gap: 1.5rem;

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }

    > div {
        position: relative;
        background: ${({theme}) => theme.colors.black};
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
            font-weight: 500;
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

        > div {
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            strong {
                font-size: 1.2rem;
            }

            button {
                background: ${({theme}) => theme.colors.red};
                border: none;
                border-radius: 50%;
                height: 2.5rem;
                width: 2.5rem;
                align-items: center;
                justify-content: center;
                display: flex;

                svg {
                    fill: ${({theme}) => theme.colors.white};
                }

                &:hover {
                    background: ${({theme}) => theme.colors.redSecondary};
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
                    fill: ${({theme}) => theme.colors.white};
                }
                
                .iconDelete {
                    fill: ${({theme}) => theme.colors.red};
                }
            }
        }

        .buttonCardapio{
            background: ${({theme}) => theme.colors.red};
            border: none;
            border-radius: 5px;
            padding: 0.8rem 2rem;
            color: ${({theme}) => theme.colors.white};
            margin: 0.5rem auto;
            display: block;
        }
    }
`