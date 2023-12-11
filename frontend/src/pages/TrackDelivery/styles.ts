import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 58.75rem;
    padding: 2rem;
    margin: 0 auto;

    .carrinho {
        display: none;
    }

    a {
        margin: 0 auto;
    }

    > div {
        background: ${({ theme }) => theme.colors.black};
        border-radius: 10px;
        padding: 1rem 1.5rem;
        align-items: center;
        justify-content: center;
    }
`