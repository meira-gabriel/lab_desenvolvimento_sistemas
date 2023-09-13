import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 18rem;

        @media (max-width: 400px) {
            width: 70%;
        }

    }

    form {
        width: 20rem;
        margin-top: 1.5rem;
        display: inline-flex;
        justify-content: center;
        background: ${({ theme }) => theme.colors.black};
        flex-direction: column;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        
        h4 {
            text-align: center;
            margin-bottom: 1rem;
            font-size: ${({ theme }) => theme.fontSize.lg};
        }

        button {
            background: ${({ theme }) => theme.colors.red};
            border: none;
            border-radius: 5px;
            padding: 0.6rem 4rem;
            color: ${({ theme }) => theme.colors.white};
            font-weight: 500;
            margin-bottom: 0.5rem;
        }

        span {
            font-size: ${({ theme }) => theme.fontSize.sm};
            font-weight: 300;
        }

        .textUnderline {
            text-decoration: underline;
            font-weight: 400;
            cursor: pointer;
        }

        .errorLogin {
            margin: 0 0 0.75rem 0;
            color: ${({theme}) => theme.colors.redSecondary};
            max-width: 12rem;
            font-weight: 500;
        }
    }
`