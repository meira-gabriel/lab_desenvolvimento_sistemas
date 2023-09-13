import { Container } from "./styles";
import logoImg from '../../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import { useAccount } from "../../hooks/useAccount";
import { useState, useEffect } from "react";


export default function Login() {

    const { loginUsuario } = useAccount()

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [senha, setSenha] = useState('')
    const [errorLogin, setErrorLogin] = useState('')

    function validaDados() {
        if (!userName && !senha) {
            setErrorLogin('Preencha todos os campos')
            return false
        } else if (!userName) {
            setErrorLogin('Usuário é obrigatório')
            return false
        } else if (!senha) {
            setErrorLogin('A senha é obrigatória')
            return false
        } else {
            return true
        }
    }

    async function loginForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!validaDados()) return

        // const response = await loginUsuario(userName, senha)
        navigate('/Inicio')
        // if (response === 'sucesso') {
        // } else {
        //     setErrorLogin(response)
        // }
    }

    useEffect(() => {
        if(userName || senha) {
            setErrorLogin('')
        }
    }, [userName, senha])    

    return (
        <Container>
            <img src={logoImg} alt="Logo" />

            <form onSubmit={loginForm}>
                <h4>Entrar no MeServe</h4>
                <FormGroup
                    typeInput="text"
                    idInput="login"
                    placeholderInput=""
                    classNameDiv="col-12"
                    htmlFor="login"
                    textLabel="Login"
                    valueInput={userName}
                    onChangeInput={(e) => setUserName(e.target.value)}
                />
                <FormGroup
                    typeInput="password"
                    idInput="senha"
                    placeholderInput=""
                    classNameDiv="col-12"
                    htmlFor="senha"
                    textLabel="Senha"
                    valueInput={senha}
                    onChangeInput={(e) => setSenha(e.target.value)}
                />

                {errorLogin && <span className="errorLogin">{errorLogin}</span>}

                <button type="submit">Entrar</button>
            </form>
        </Container>
    )
}