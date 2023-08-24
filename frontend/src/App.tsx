import Header from 'components/header'
import './styles/global.css'
import Products from 'components/products'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProductsContextProvider } from 'contexts/ProductsContext'

function App() {
  return (
    <div className="App">
      <Header />
      <ProductsContextProvider>
        <Products />
      </ProductsContextProvider>
    </div>
  )
}

export default App
