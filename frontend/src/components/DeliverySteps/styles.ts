import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;

    .MuiStepper-root {
        width: 40%;
    }

    .resumoPedido {
        justify-content: center;
        max-width: 60%;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        border: 1px solid ${({theme}) => theme.colors.gray600};
        border-radius: 5px;

        h3 {
            padding-bottom: 10px;
            border-bottom: 1px solid ${({theme}) => theme.colors.gray600};
            margin-bottom: 1rem;
        }

        ul {
            margin-bottom: 1rem;
            
            li {
                display: flex;
                flex-direction: column;
                font-weight: 400;
                
                span {
                    font-size: ${({theme}) => theme.fontSize.md};
                    color: ${({theme}) => theme.colors.gray500};
                }
            }
        }

        .rodapeResumo {
            padding-bottom: 10px;
            border-bottom: 1px solid ${({theme}) => theme.colors.gray600};
            margin-bottom: 1rem;
        }
    }

    span {
        color: white;
        font-family: Montserrat;

        .MuiSvgIcon-root {
            color: white;
        }

        .MuiStepLabel-label {
            color: ${({theme}) => theme.colors.gray100};

            &.Mui-completed {
                color: white;
                font-weight: 600;
            }
        }
    }

    .mapa {
        align-items: center;
        > span {
            font-weight: 600;
            font-size: ${({theme}) => theme.fontSize.lg};
            border-bottom: 1px solid ${({theme}) => theme.colors.gray700};
            padding-bottom: 5px;
            margin: -1rem 0 0.5rem 0;
            display: flex;
        }
    }
`