import { FaSearch } from "react-icons/fa"
import { Container } from "../styles"

interface InputSearchProps {
    classNameDiv: string
    typeInput: string
    idInput: string
    placeholderInput: string
    valueInput?: string
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
    htmlFor: string
    textLabel: string
}

export default function InputSearch({
    classNameDiv,
    typeInput,
    idInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    htmlFor,
    textLabel }: InputSearchProps) {
    return (
        <Container>
            <div className={`form-group ${classNameDiv} inputSearch`}>
                <div className="search-icon">
                    <FaSearch />
                </div>

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