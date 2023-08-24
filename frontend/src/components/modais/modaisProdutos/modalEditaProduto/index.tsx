/*eslint-disable*/
import { ProductsContext } from 'contexts/ProductsContext'
import { useContext, useState } from 'react'
import ModalMessage from 'components/modais/ModalMessage'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { editarProduto } from 'services/productsService'

interface ModalEditaProdutoProps {
  readonly show: boolean
  readonly nome: string
  readonly preco: string
  readonly descricao: string
  readonly imagem: string
  readonly id: number
  readonly textbutton: string
  readonly textbutton2: string
  readonly onHide: () => void
  readonly onClick: () => void
}

function ModalEditaProduto({
  show,
  id,
  nome,
  descricao,
  preco,
  imagem,
  textbutton,
  textbutton2,
  onClick,
  onHide,
  ...rest
}: ModalEditaProdutoProps) {
  const [nomeEditadoProduto, setNomeEditadoProduto] = useState(nome)
  const [descricaoEditadaProduto, setDescricaoEditadaProduto] = useState(descricao)
  const [precoEditadoProduto, setPrecoEditadoProduto] = useState(preco)

  const [successEditProduto, setSuccessEditProduto] = useState(false)
  const [falhaEditProduto, setFalhaEditProduto] = useState(false)
  const [messageModalEditProduto, setMessageModalEditProduto] = useState('')

  const { atualizaProdutos } = useContext(ProductsContext)

  const { handleSubmit } = useForm()

  const formAtualizaProduto = () => {
    editarProduto(id, nomeEditadoProduto, descricaoEditadaProduto, precoEditadoProduto, imagem)
      .then((response) => {
        if (response.status === 200) {
          setMessageModalEditProduto('Produto editado com sucesso!')
          setSuccessEditProduto(true)
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          setMessageModalEditProduto('Falha na edição do produto. Tente novamente')
          setFalhaEditProduto(true)
        }
      })
  }

  return (
    <>
      {!successEditProduto && !falhaEditProduto && (
        <Modal
          {...rest}
          show={show}
          dialogClassName="modalMedio"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="headerModalEdit">
              <h4>Editar produto</h4>
            </div>

            <div className="bodyModalEdit">
              <form className="formEdicaoAgente" onSubmit={handleSubmit(formAtualizaProduto)}>
                <div className="editaAgente">
                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="nomeEdicaoProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="nomeEdicaoProduto"
                      value={nomeEditadoProduto}
                      onChange={(e) => setNomeEditadoProduto(e.target.value)}
                    />
                    <label>Nome</label>
                  </div>

                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="descricaoEdicaoProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="descricaoEdicaoProduto"
                      value={descricaoEditadaProduto}
                      onChange={(e) => setDescricaoEditadaProduto(e.target.value)}
                    />
                    <label>Descrição</label>
                  </div>

                  <div className="labelForm col-8">
                    <input
                      type="text"
                      name="precoEdicaoProduto"
                      placeholder="Nome"
                      className="form-control"
                      id="precoEdicaoProduto"
                      value={precoEditadoProduto}
                      onChange={(e) => setPrecoEditadoProduto(e.target.value)}
                    />
                    <label>Preço</label>
                  </div>
                </div>

                <div className="buttonsModalEdit">
                  <Button
                    type="submit"
                    onClick={handleSubmit(formAtualizaProduto)}
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
        title={messageModalEditProduto}
        className="modalSuccess"
        show={successEditProduto}
        onHide={() => [setSuccessEditProduto(false), onClick(), atualizaProdutos()]}
        textbutton="OK"
      />

      <ModalMessage
        title={messageModalEditProduto}
        className="modalFalha"
        show={falhaEditProduto}
        onHide={() => [setFalhaEditProduto(false), onClick()]}
        textbutton="OK"
      />
    </>
  )
}

export default ModalEditaProduto
