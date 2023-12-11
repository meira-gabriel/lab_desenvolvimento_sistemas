/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProducts } from '../../../../../hooks/useProducts'
import { ProductsData } from '../../../../../interfaces/productsData'
import Loading from '../../../../Loading'
import { ModalDelete, Overlay } from '../../styles'

interface ModalDeleteProductProps {
  handleDeleteClick: any
  productInfo: ProductsData
}

export default function ModalDeleteProduct({
  handleDeleteClick,
  productInfo,
}: ModalDeleteProductProps) {
  const {
    dadosEnviados,
    setDadosEnviados,
    loading,
    setLoading,
    error,
    messageEnvio,
    confirmDeleteProduct,
    resetStatesProducts,
  } = useProducts()

  function onDeleteProduct(id: number) {
    setLoading(true)
    setDadosEnviados(true)

    confirmDeleteProduct(id)
    setTimeout(() => {
      handleDeleteClick(null)
    }, 5000)
  }

  function closeModal() {
    handleDeleteClick(null)
    resetStatesProducts()
  }
  return (
    <>
      {dadosEnviados ? (
        <>
          <Overlay onClick={closeModal}></Overlay>
          <ModalDelete>
            <Loading error={error} loading={loading} message={messageEnvio} onClose={closeModal} />
          </ModalDelete>
        </>
      ) : (
        <>
          <Overlay onClick={() => handleDeleteClick(null)}></Overlay>
          <ModalDelete>
            <div>
              <h3>Excluir produto</h3>
              <p>Tem certeza que deseja excluir o produto {productInfo.nome}?</p>
              <div className='buttonsDelete'>
                <button className='buttonDelete' onClick={() => onDeleteProduct(productInfo.id)}>
                  Excluir
                </button>
                <button className='buttonCancel' onClick={() => handleDeleteClick(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </ModalDelete>
        </>
      )}
    </>
  )
}
