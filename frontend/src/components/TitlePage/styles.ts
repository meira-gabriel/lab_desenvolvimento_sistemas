import styled from "styled-components";

export const Title = styled.h1`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    margin-bottom: 3rem;

    font-size: ${({theme}) => theme.fontSize["4xl"]};
    font-weight: 500;
    text-transform: uppercase;

    @media (max-width: 720px){
        font-size: ${({theme}) => theme.fontSize["3xl"]};
        justify-content: center;

        &::before {
            display: none;
        }
    }
`