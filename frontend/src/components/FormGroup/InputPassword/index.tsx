import { FaSearch } from "react-icons/fa"
import { Container } from "../styles"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputPasswordProps {
    classNameDiv: string
    typeInput: string
    idInput: string
    placeholderInput: string
    valueInput?: string
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
    showSenha: React.MouseEventHandler<SVGElement>
    hideSenha: React.MouseEventHandler<SVGElement>
    htmlFor: string
    textLabel: string
}

export default function InputPassword({
    classNameDiv,
    typeInput,
    idInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    showSenha,
    hideSenha,
    htmlFor,
    textLabel }: InputPasswordProps) {
    return (
        <Container>
            <div className={`form-group ${classNameDiv}`}>
                <div className="hidePassword-icon">
                    {typeInput === "text" ? <AiFillEyeInvisible onClick={hideSenha} /> : <AiFillEye onClick={showSenha} />}
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