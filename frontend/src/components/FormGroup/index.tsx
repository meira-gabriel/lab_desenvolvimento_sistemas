import { Container } from "./styles"

interface FormGroupProps {
    classNameDiv: string
    typeInput: string
    idInput: string
    placeholderInput: string
    valueInput?: string
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
    htmlFor: string
    textLabel: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function FormGroup({
    classNameDiv,
    typeInput,
    idInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    htmlFor,
    textLabel,
    onClick }: FormGroupProps) {
    return (
        <Container className={classNameDiv} onClick={onClick}>
            <div className={`form-group col-12`}>
                <input
                    type={typeInput}
                    id={idInput}
                    placeholder={placeholderInput}
                    value={valueInput}
                    onChange={onChangeInput}
                />
                <label htmlFor={htmlFor}>{textLabel}</label>
            </div>
        </Container>
    )
}