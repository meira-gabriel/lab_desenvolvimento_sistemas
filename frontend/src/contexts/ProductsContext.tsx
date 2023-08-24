import { ReactNode, createContext, useState, useMemo, useEffect, useCallback } from 'react'
import api from 'services/api'

interface ProductsContextProps {
  produtos: any[]
  atualizaProdutos: any
}

interface ProductsContextProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextProps)

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    api
      .get('/produtos')
      .then((response) => {
        setProdutos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const atualizaProdutos = useCallback(() => {
    api
      .get('/produtos')
      .then((response) => {
        console.log(response)
        setProdutos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const contextValues = useMemo(
    () => ({
      produtos,
      setProdutos,
      atualizaProdutos
    }),
    [produtos, atualizaProdutos]
  )
  return <ProductsContext.Provider value={contextValues}>{children}</ProductsContext.Provider>
}
