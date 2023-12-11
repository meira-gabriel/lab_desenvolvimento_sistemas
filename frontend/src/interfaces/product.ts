import { ProductsData } from "./productsData"

export interface Product extends ProductsData {
  quantity: number
  subtotal: number
}
