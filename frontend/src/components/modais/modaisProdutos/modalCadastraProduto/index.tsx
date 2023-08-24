/*eslint-disable*/
import { ProductsContext } from 'contexts/ProductsContext'
import { useContext, useState } from 'react'
import ModalMessage from 'components/modais/ModalMessage'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { editarProduto, novoProduto } from 'services/productsService'

interface ModalCadastraProdutoProps {
  readonly show: boolean
  readonly textbutton: string
  readonly textbutton2: string
  readonly onHide: () => void
  readonly onClick: () => void
}

function ModalCadastraProduto({
  show,
  textbutton,
  textbutton2,
  onClick,
  onHide,
  ...rest
}: ModalCadastraProdutoProps) {
  const [nomeProduto, setNomeProduto] = useState('')
  const [descricaoProduto, setDescricaoProduto] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [imagemProduto, setImagemProduto] = useState('')

  const [successCriaProduto, setSuccessCriaProduto] = useState(false)
  const [falhaCriaProduto, setFalhaCriaProduto] = useState(false)
  const [messageModalCriaProduto, setMessageModalCriaProduto] = useState('')

  const { atualizaProdutos } = useContext(ProductsContext)

  const { handleSubmit } = useForm()

  const formCriaProduto = () => {
    novoProduto(nomeProduto, descricaoProduto, precoProduto, imagemProduto)
      .then((response) => {
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          setMessageModalCriaProduto('Produto cadastrado com sucesso!')
          setSuccessCriaProduto(true)
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          setMessageModalCriaProduto('Falha no cadastro do produto. Tente novamente')
          setFalhaCriaProduto(true)
        }
      })
  }

  return (
    <>
      {!successCriaProduto && !falhaCriaProduto && (
        <Modal
          {...rest}
          show={show}
          dialogClassName="modalMedio"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="headerModalEdit">
              <h4>Cadastrar produto</h4>
            </div>

            <div className="bodyModalEdit">
              <form className="formEdicaoAgente" onSubmit={handleSubmit(formCriaProduto)}>
                <div className="editaAgente">
                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="nomeProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="nomeProduto"
                      value={nomeProduto}
                      onChange={(e) => setNomeProduto(e.target.value)}
                    />
                    <label>Nome</label>
                  </div>

                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="descricaoProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="descricaoProduto"
                      value={descricaoProduto}
                      onChange={(e) => setDescricaoProduto(e.target.value)}
                    />
                    <label>Descrição</label>
                  </div>

                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="precoProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="precoProduto"
                      value={precoProduto}
                      onChange={(e) => setPrecoProduto(e.target.value)}
                    />
                    <label>Preço</label>
                  </div>
                  
                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="imagemProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="imagemProduto"
                      value={imagemProduto}
                      onChange={(e) => setImagemProduto(e.target.value)}
                    />
                    <label>Imagem</label>
                  </div>
                </div>

                <div className="buttonsModalEdit">
                  <Button
                    type="submit"
                    onClick={handleSubmit(formCriaProduto)}
                    variant="none"
                    className="buttonSave"
                  >
                    {textbutton}
                  </Button>
                  <Button onClick={onHide} variant="none" className="buttonCancel">
                    {textbutton2}
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <ModalMessage
        title={messageModalCriaProduto}
        className="modalSuccess"
        show={successCriaProduto}
        onHide={() => [setSuccessCriaProduto(false), onClick(), atualizaProdutos()]}
        textbutton="OK"
      />

      <ModalMessage
        title={messageModalCriaProduto}
        className="modalFalha"
        show={falhaCriaProduto}
        onHide={() => [setFalhaCriaProduto(false), onClick()]}
        textbutton="OK"
      />
    </>
  )
}

export default ModalCadastraProduto
