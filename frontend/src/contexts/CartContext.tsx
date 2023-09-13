import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { CardsData } from '../interfaces/cardsData'

interface Product extends CardsData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
  cart: Product []
  addProductIntoCart: (product: CardsData) => void
  removeProductFromCart: (product: Product) => void
  productCartIncrement: (product: Product) => void
  productCartDecrement: (product: Product) => void
  confirmOrder: () => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([])

  function addProductIntoCart(product: CardsData): void {
    const productExistentInCart = cart.find(
      (item) => item.nome === product.nome && item.id === product.id,
    )

    if (productExistentInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          const quantity = item.quantity + 1
          const subtotal = item.preco * quantity

          return { ...item, quantity, subtotal }
        }

        return item
      })

      toast.success("Produto adicionado ao carrinho")
      setCart(newCart)

      return
    }

    const newProduct = { ...product, quantity: 1, subtotal: product.preco }
    const newCart = [...cart, newProduct] // push de um array

    toast.success("Produto adicionado ao carrinho")
    setCart(newCart)
  }

  function removeProductFromCart(product: Product) {
    const newCart = cart.filter((item) => !(item.id === product.id && item.nome === product.nome))

    setCart(newCart)
  }

  function updateProductQuantity(product: Product, newQuantity: number) {
    if (newQuantity <= 0) return

    const productExistentInCart = cart.find(
      (item) => item.id === product.id && item.nome === product.nome,
    )

    if (!productExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === productExistentInCart.id && item.nome === productExistentInCart.nome) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.preco * newQuantity,
        }
      }

      return item
    })

    setCart(newCart)
  }

  function productCartIncrement(product: Product) {
    updateProductQuantity(product, product.quantity + 1)
  }

  function productCartDecrement(product: Product) {
    updateProductQuantity(product, product.quantity - 1)
  }

  function confirmOrder() {
    return
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductIntoCart,
        removeProductFromCart,
        productCartIncrement,
        productCartDecrement,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
