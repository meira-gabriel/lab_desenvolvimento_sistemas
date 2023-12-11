import { Container } from './styles'
import logoImg from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../../hooks/useAccount'
import { useState, useEffect } from 'react'
import { FloatLabel } from '../../styles/formGlobal'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function Login() {
  const { loginUsuario } = useAccount()

  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [senha, setSenha] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [typeInput, setTypeInput] = useState('password')

  function hideSenha() {
    setTypeInput('password')
  }

  function showSenha() {
    setTypeInput('text')
  }

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

  function loadDeliveryScreen() {
    navigate('/Entregador')
  }

  function showError(message: string) {
    alert(message)
  }

  function verificaAcessoLocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function () {
          loadDeliveryScreen()
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            showError('Você precisa permitir o acesso à localização para continuar.')
          } else {
            showError('Ocorreu um erro ao obter sua localização.')
          }
        },
      )
    } else {
      showError('Seu navegador não suporta geolocalização. Por favor, use um navegador diferente.')
    }
  }

  async function loginForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validaDados()) return

    const { message, role } = await loginUsuario(userName, senha)

    if (message === 'sucesso') {
      if (role === 'usuario') {
        navigate('/Inicio')
      } else if (role === 'admin') {
        navigate('/produtos')
      } else {
        verificaAcessoLocalizacao()
      }
    } else {
      setErrorLogin(message)
    }
  }

  useEffect(() => {
    if (userName || senha) {
      setErrorLogin('')
    }
  }, [userName, senha])

  return (
    <Container>
      <img src={logoImg} alt='Logo' />

      <form onSubmit={loginForm}>
        <h4>Entrar no MeServe</h4>
        <FloatLabel className='col-12'>
          <div className='form-group col-12'>
            <input
              type='text'
              id='login'
              placeholder=''
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor='login'>Login</label>
          </div>
        </FloatLabel>

        <FloatLabel className='col-12'>
          <div className='form-group col-12'>
            <div className='hidePassword-icon'>
              {typeInput === 'text' ? (
                <AiFillEyeInvisible onClick={hideSenha} />
              ) : (
                <AiFillEye onClick={showSenha} />
              )}
            </div>
            <input
              type={typeInput}
              id='senha'
              placeholder=''
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label htmlFor='senha'>Senha</label>
          </div>
        </FloatLabel>

        {errorLogin && <span className='errorLogin'>{errorLogin}</span>}

        <button type='submit'>Entrar</button>
      </form>
    </Container>
  )
}
