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
}

export default function FormGroup({
    classNameDiv,
    typeInput,
    idInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    htmlFor,
    textLabel }: FormGroupProps) {
    return (
        <Container>
            <div className={`form-group ${classNameDiv}`}>
                <input
                    type={typeInput}
                    id={idInput}
                    placeholder={placeholderInput}
                    value={valueInput}
                    onChange={onChangeInput}
                    className="col-12"
                />
                <label htmlFor={htmlFor}>{textLabel}</label>
            </div>
        </Container>
    )
}