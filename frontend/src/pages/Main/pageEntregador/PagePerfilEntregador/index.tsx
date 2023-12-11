import Head from '../../../../components/Head'
import { Container } from '../../Perfil/styles'

function PagePerfilEntregador() {
  return (
    <>
      <Head title='Perfil'></Head>
      <Container>
        <h4>Perfil</h4>
        <div>
          <form>
            {/* <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='email'
              placeholderInput=''
              htmlFor='email'
              textLabel='E-mail'
            />
            <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='nome'
              placeholderInput=''
              htmlFor='nome'
              textLabel='Nome'
            />
            <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='telefone'
              placeholderInput=''
              htmlFor='telefone'
              textLabel='telefone'
            />
            <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='cpf'
              placeholderInput=''
              htmlFor='cpf'
              textLabel='cpf'
            />
            <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='cep'
              placeholderInput=''
              htmlFor='cep'
              textLabel='cep'
            />
            <FormGroup
              classNameDiv='col-12'
              typeInput='text'
              idInput='Endereço'
              placeholderInput=''
              htmlFor='endereco'
              textLabel='endereço'
            /> */}
          </form>

          <img src='https://pbs.twimg.com/media/Fopu3e_XgAEpMfG.jpg' alt='sem foto'></img>
        </div>
      </Container>
    </>
  )
}

export default PagePerfilEntregador
