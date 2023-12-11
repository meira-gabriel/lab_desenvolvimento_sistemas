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
            width: 95%;
            align-self: center;
            background: ${({ theme }) => theme.colors.red};
            border: none;
            border-radius: 5px;
            padding: 0.6rem 4rem;
            color: ${({ theme }) => theme.colors.white};
            font-weight: 500;
            margin: 0.5rem 0;
        }

        span {
            font-size: ${({ theme }) => theme.fontSize.sm};
            font-weight: 300;
            padding-left: 5px;
        }

        .textUnderline {
            text-decoration: underline;
            font-weight: 400;
            cursor: pointer;
        }

        .errorLogin {
            margin: 0 0 0.75rem 0;
            color: ${({theme}) => theme.colors.gray300};
            font-weight: 600;
            font-size: 0.75rem;
        }
    }
`