import styled from "styled-components";

export const Container = styled.div `
    div {
        display: flex;
        gap: 1.5rem;

        button {
            background: ${({theme}) => theme.colors.red};
            border-radius: 5px;
            padding: 0.5rem 1rem;
            margin-bottom: 1rem;
            border: none;
            color: ${({theme}) => theme.colors.white};

            &:hover {
                background: ${({theme}) => theme.colors.yellow};
            }
        }

        .active {
            background: ${({theme}) => theme.colors.yellow};
        }
    }
`
