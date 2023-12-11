/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { ProductsData } from '../interfaces/productsData'
import { RestaurantsData } from '../interfaces/restaurantsData'
import { deleteProduct, editProduct, getProducts, newProduct } from '../services/productsService'
import { getRestaurants } from '../services/restaurantsService'

interface ProductsContextProps {
  products: ProductsData[]
  restaurants: RestaurantsData[]
  dadosEnviados: boolean
  setDadosEnviados: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  error: boolean
  messageEnvio: string
  registerNewProduct(product: ProductsData): void
  confirmEditProduct(product: ProductsData): void
  confirmDeleteProduct(id: number): any
  resetStatesProducts(): any
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextProps)

export function ProductsProvider({ children }: ProductsProviderProps) {
  // #region Estados Globais
  const [products, setProducts] = useState<ProductsData[]>([])
  const [restaurants, setRestaurants] = useState<RestaurantsData[]>([])
  // #endregion

  // #region Estados CRUD de produtos
  const [dadosEnviados, setDadosEnviados] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [messageEnvio, setMessageEnvio] = useState('')
  // #endregion

  // #region Primeiro carregamento de dados
  useEffect(() => {
    ;(async () => {
      try {
        const productsRequest = getProducts()
        const restaurantsRequest = getRestaurants()

        const [productsResponse, restaurantsResponse] = await Promise.all([
          productsRequest,
          restaurantsRequest,
        ])

        const mappedProducts: ProductsData[] = productsResponse.data
        const mappedRestaurants: RestaurantsData[] = restaurantsResponse.data

        setProducts(mappedProducts)
        setRestaurants(mappedRestaurants)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  // #endregion

  // #region Funções do CRUD de produtos
  function resetStatesProducts() {
    setDadosEnviados(false)
    setLoading(false)
    setError(false)
    setMessageEnvio('')
  }

  function updateProducts() {
    getProducts()
      .then((response) => {
        setProducts(response.data)
        setTimeout(() => {
          resetStatesProducts()
        }, 5001)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function registerNewProduct(product: ProductsData) {
    newProduct(product)
      .then(() => {
        setLoading(false)
        setMessageEnvio('Produto cadastrado com sucesso!')
        updateProducts()
      })
      .catch(() => {
        setLoading(false)
        setError(true)
        setMessageEnvio('Erro ao cadastrar produto. Tente novamente.')
      })
  }

  function confirmEditProduct(product: ProductsData) {
    editProduct(product)
      .then(() => {
        setLoading(false)
        setMessageEnvio('Produto editado com sucesso!')
        updateProducts()
      })
      .catch(() => {
        setLoading(false)
        setError(true)
        setMessageEnvio('Erro ao editar produto. Tente novamente.')
      })
  }

  function confirmDeleteProduct(id: number) {
    deleteProduct(id)
      .then(() => {
        setLoading(false)
        setMessageEnvio('Produto excluído com sucesso!')
        updateProducts()
      })
      .catch(() => {
        setLoading(false)
        setError(true)
        setMessageEnvio('Erro ao excluir produto. Tente novamente.')
      })
  }
  // #endregion

  const contextValues = useMemo(
    () => ({
      products,
      setProducts,
      restaurants,
      setRestaurants,
      dadosEnviados,
      setDadosEnviados,
      loading,
      setLoading,
      error,
      messageEnvio,
      registerNewProduct,
      confirmEditProduct,
      confirmDeleteProduct,
      resetStatesProducts,
    }),
    [
      products,
      restaurants,
      dadosEnviados,
      loading,
      error,
      messageEnvio,
      registerNewProduct,
      confirmEditProduct,
      confirmDeleteProduct,
      resetStatesProducts,
    ],
  )
  return <ProductsContext.Provider value={contextValues}>{children}</ProductsContext.Provider>
}
