import { useContext } from 'react'

import { ProductsContext } from '../contexts/ProductsContext'

export function useProducts() {
    return useContext(ProductsContext)
}