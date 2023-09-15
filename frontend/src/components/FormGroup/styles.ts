import styled from "styled-components";

export const Container = styled.div`
    .form-group {
        position: relative;
        margin-bottom: 1rem;
        display: inline-block;
    }

    .inputSearch {
        margin-bottom: 0;
    }

    label {
        position: absolute;
        top: 0.6rem;
        left: 1rem;
        color: ${({ theme }) => theme.colors.gray600};
        pointer-events: none;
        transition: 0.3s ease-out;
    }

    input {
        background: ${({ theme }) => theme.colors.gray900};
        border: 1px solid ${({ theme }) => theme.colors.red};
        padding: 0.6rem;
        border-radius: 5px;
        
        &:focus,
        &:not(:placeholder-shown) {
            color: ${({ theme }) => theme.colors.white};
            outline: ${({ theme }) => theme.colors.gray600};
            border: 1px solid ${({ theme }) => theme.colors.gray600};
            &+ label {
                top: -0.6rem;
                left: 0.5rem;
                font-size: 0.75rem;
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.black};
            }   
        }
    }

    .search-icon,
    .hidePassword-icon {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
    }

    .search-icon {
        color: ${({ theme }) => theme.colors.redSecondary};
    }
    
    .hidePassword-icon {
        color: ${({ theme }) => theme.colors.gray300};
    }
`