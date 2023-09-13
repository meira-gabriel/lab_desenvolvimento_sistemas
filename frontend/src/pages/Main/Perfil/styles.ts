import styled from "styled-components";

export const Container = styled.div`
    background: ${({theme}) => theme.colors.black};
    width: 100%;
    border-radius: 5px;
    padding: 1rem 2rem;

    h4 {
        color: ${({theme}) => theme.colors.red};
        font-size: ${({theme}) => theme.fontSize["2xl"]};
        text-transform: uppercase;
        margin-bottom: 1rem;

        @media (max-width: 720px) {
            text-align: center;
            font-size: ${({theme}) => theme.fontSize.lg};
        }
    }

    >div {
        display: flex;
        align-items: center;

        @media (max-width: 720px) {
            flex-direction: column;
        }

        img{
            margin: 0 auto;
            border-radius: 5px;
            width: 18rem;
        }
    }

    form {
        width: 50%;

        @media (max-width: 720px) {
            width: 100%;
        }

        label {
            text-transform: capitalize;
        }
    }
`