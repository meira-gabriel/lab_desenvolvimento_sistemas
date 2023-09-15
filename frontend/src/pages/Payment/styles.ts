import styled from "styled-components";

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
        text-align: center;
        display: grid;

        h3 {
            font-size: ${({ theme }) => theme.fontSize["3xl"]};
            margin-bottom: 1rem;
        }

        h4 {
            margin-bottom: 0.3rem;
        }

        img {
            width: 15rem;
            margin-bottom: 0.5rem;
        }

        span {
            margin-bottom: 1rem;
        }

        button {
            background: ${({theme}) => theme.colors.redSecondary};
            color: ${({theme}) => theme.colors.white};;
            border-radius: 5px;
            border: none;
            width: 10rem;
            margin: 0 auto;
            padding: 0.5rem 1rem;

            &:hover {
                background: ${({theme}) => theme.colors.red};
            }
        }
   }
`