import styled from "styled-components";

export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    margin: 0.5rem 0.1rem;
`

export const Filtro = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: 500px) {
        display: block;
    }

    .filtro {
        display: flex;
        gap: 0.3rem;
        align-items: center;
        background: ${({ theme }) => theme.colors.red};
        border: 1px solid ${({ theme }) => theme.colors.red};
        border-radius: 10px;
        padding: 0.5rem 1rem;
        color: ${({ theme }) => theme.colors.white};

        svg {
            cursor: pointer;
        }

        @media (max-width: 500px) {
            margin-bottom: 0.5rem;
        }
    }

    .selectFiltro {
        display: flex;
        align-items: center;
        background: ${({ theme }) => theme.colors.red};
        border: 1px solid ${({ theme }) => theme.colors.red};
        border-radius: 10px;
        padding: 0.5rem;
        color: ${({ theme }) => theme.colors.white};

        option {
            background: ${({ theme }) => theme.colors.gray700};
            
            &:hover {
                background: ${({ theme }) => theme.colors.yellow};
            }
        }

        @media (max-width: 500px) {
            width: 100%;
            margin-bottom: 0.5rem;
        }
    }
`

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
        display: flex;
        align-items: center;
        gap: 1.5rem;
        
        img {
            object-fit: cover;
            width: 6rem;
            height: 6rem;
            border-radius: 5px;
            margin-bottom: 0.5rem;
        }

        h3 {
            font-weight: 600;
            font-size: 1.25rem;
            text-align: left;
        }

        .avaliacao {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            margin: 0.3rem 0;
            font-size: ${({ theme }) => theme.fontSize.md};

            .nota {
                color: ${({ theme }) => theme.colors.yellow};
                font-weight: 600;
            }

            svg {
                fill: ${({ theme }) => theme.colors.yellow};
            }
        }

        button {
            background: ${({ theme }) => theme.colors.gray400};
            border: none;
            border-radius: 5px;
            padding: 0.3rem 0.5rem;
            color: ${({ theme }) => theme.colors.red};
            align-items: center;
            display: flex;
            gap: 0.3rem;
            
            span {
                color:${({ theme }) => theme.colors.black};
                font-weight: 500;
                font-size: ${({ theme }) => theme.fontSize.md};;
            }

            svg {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
`