import { useContext } from 'react'

import { ProductsContext } from '../contexts/productsContext'

export function useProducts() {
    return useContext(ProductsContext)
}