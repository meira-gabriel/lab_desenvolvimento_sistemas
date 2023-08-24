import { ProductsContext } from 'contexts/ProductsContext'
import React, { useContext, useState } from 'react'
import './styles.css'
/* eslint-disable */
import Tooltip from '@mui/material/Tooltip'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import { deletarProduto } from 'services/productsService'
/* eslint-enable */
import ModalCadastraProduto from '../modais/modaisProdutos/modalCadastraProduto'
import ModalEditaProduto from '../modais/modaisProdutos/modalEditaProduto'

export default function Products() {
  const { produtos, atualizaProdutos } = useContext(ProductsContext)

  const [showModalEdit, setShowModalEdit] = useState({})
  const [showModalCadastro, setShowModalCadastro] = useState(false)

  const mostraEdicao = (valor) => () => {
    setShowModalEdit((state) => ({
      ...state,
      [valor]: !state[valor]
    }))
  }

  const mostraCadastro = () => {
    setShowModalCadastro(true)
  }

  return (
    <div className="listagemProdutos">
      <div className="title container mt-3">
        <h4 className="mt-2">Listagem de produtos -</h4>
        <button className="buttonAddProduct" onClick={mostraCadastro}>
          <IoIosAdd size={20} />
          <span> Cadastrar produto</span>
        </button>
      </div>
      <div className="grid container mt-3">
        {produtos.map((prod) => (
          <div className="cardProduto mb-3" key={prod.id}>
            <div className="headCard">
              <h4>
                {prod.nome} - {prod.preco}
              </h4>
            </div>

            <hr />

            <div className="bodyCard">
              <img src={`/imgs/${prod.imagem}`} alt={prod.nome} className="imgCard" />
            </div>

            <hr />

            <div className="footerCard">
              <div className="descricaoProduto">{prod.descricao}</div>
              <div className="icons">
                <div className="icon">
                  <Tooltip title="Editar produto" placement="bottom" arrow>
                    <div>
                      <FaRegEdit onClick={mostraEdicao(prod.id)} size={20} className="iconEdit" />
                    </div>
                  </Tooltip>
                </div>

                <div className="icon">
                  <Tooltip title="Excluir produto" placement="bottom" arrow>
                    <div>
                      <FaTrashAlt
                        size={20}
                        color="#dd4456"
                        onClick={() => [deletarProduto(prod.id), atualizaProdutos()]}
                        className="iconDelete"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>

            {showModalEdit[prod.id] && (
              <div className="modalEdit">
                <ModalEditaProduto
                  show={!!showModalEdit}
                  onHide={() => setShowModalEdit({})}
                  onClick={() => setShowModalEdit({})}
                  textbutton="Salvar"
                  textbutton2="Cancelar"
                  nome={prod.nome}
                  descricao={prod.descricao}
                  preco={prod.preco}
                  id={prod.id}
                  imagem={prod.imagem}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {showModalCadastro && (
        <div className="modalEdit">
          <ModalCadastraProduto
            show={!!showModalCadastro}
            onHide={() => setShowModalCadastro(false)}
            onClick={() => setShowModalCadastro(false)}
            textbutton="Cadastrar"
            textbutton2="Cancelar"
          />
        </div>
      )}
    </div>
  )
}
