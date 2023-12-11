import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { ProductsData } from '../interfaces/productsData'
import { CustomerData } from '../interfaces/customerData'
import { CreditCardData } from '../interfaces/creditCardData'
import { processCheckout } from '../services/checkoutService'
import { useNavigate } from 'react-router-dom'
import { getDeliveryById, setStatusDelivery } from '../services/deliveryService'

interface Product extends ProductsData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
  cart: Product[]
  addProductIntoCart: (product: ProductsData) => void
  removeProductFromCart: (product: Product) => void
  productCartIncrement: (product: Product) => void
  productCartDecrement: (product: Product) => void
  payOrder: (customer: CustomerData, payment: CreditCardData) => void
  deliveryId: number
  setDeliveryId: any
  duration: string
  setDuration: any
  deliveryFull: boolean
  setDeliveryFull: any
  startedDelivery: boolean
  setStartedDelivery: any
  clearCart: any
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

const localStorageKey = '@MeServe:cart'

export function CartProvider({ children }: CartProviderProps) {
  const navigate = useNavigate()

  const [cart, setCart] = useState<Product[]>(() => {
    const value = localStorage.getItem(localStorageKey)

    if (value) return JSON.parse(value)

    return []
  })

  const [deliveryId, setDeliveryId] = useState(0)
  const [duration, setDuration] = useState('')
  const [deliveryFull, setDeliveryFull] = useState(false)
  const [startedDelivery, setStartedDelivery] = useState(false)

  function saveCart(items: Product[]) {
    setCart(items)
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

  function clearCart() {
    setCart([])
    localStorage.removeItem(localStorageKey)
  }

  function addProductIntoCart(product: ProductsData): void {
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

      toast.success('Produto adicionado ao carrinho')
      saveCart(newCart)

      return
    }

    const newProduct = { ...product, quantity: 1, subtotal: Number(product.preco) }
    const newCart = [...cart, newProduct] // push de um array

    toast.success('Produto adicionado ao carrinho')
    saveCart(newCart)
  }

  function removeProductFromCart(product: Product) {
    const newCart = cart.filter((item) => !(item.id === product.id && item.nome === product.nome))

    saveCart(newCart)
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
          subtotal: Number(item.preco * newQuantity),
        }
      }

      return item
    })

    saveCart(newCart)
  }

  function productCartIncrement(product: Product) {
    updateProductQuantity(product, product.quantity + 1)
  }

  function productCartDecrement(product: Product) {
    updateProductQuantity(product, product.quantity - 1)
  }

  async function payOrder(customer: CustomerData, payment: CreditCardData) {
    try {
      const response = await processCheckout(cart, customer, payment)

      if (response.data.status !== 'PAID') {
        toast.error('Erro ao processar o pagamento, por favor, tente novamente mais tarde.')
        return
      }

      const delivery = await getDeliveryById(response.data.deliveryId)

      setDeliveryId(delivery.data.id)
      toast.success('Pagamento realizado com sucesso!')
      navigate('/Acompanhar-entrega')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao processar o pedido.')
    }
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
        payOrder,
        deliveryId,
        setDeliveryId,
        duration,
        setDuration,
        deliveryFull,
        setDeliveryFull,
        startedDelivery,
        setStartedDelivery,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
