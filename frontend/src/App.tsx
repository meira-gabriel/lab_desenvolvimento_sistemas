import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'

import { Theme } from './styles/Theme'
import { GlobalStyle } from './styles/global'
import { Normalize } from 'styled-normalize'
import { ProductsProvider } from './contexts/ProductsContext'
import { CartProvider } from './contexts/CartContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AccountProvider } from './contexts/AccountContext'

export default function App() {

  return (
    <BrowserRouter>
      <Theme>
        <AccountProvider>
          <ProductsProvider>
            <CartProvider>
              <AppRoutes />
              <ToastContainer autoClose={2000} position='bottom-center' />
              <GlobalStyle />
              <Normalize />
            </CartProvider>
          </ProductsProvider>
        </AccountProvider>
      </Theme>
    </BrowserRouter>
  )
}
