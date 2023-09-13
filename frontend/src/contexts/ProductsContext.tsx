import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { CardsData } from "../interfaces/cardsData";
import { RestaurantsData } from "../interfaces/restaurantsData";
import { getProducts } from "../services/productsService";
import { getRestaurants } from "../services/restaurantsService";

interface ProductsContextProps {
    products: CardsData[]
    restaurants: RestaurantsData[]
}

interface ProductsProviderProps {
    children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextProps)

export function ProductsProvider ({children}: ProductsProviderProps) {

    const [products, setProducts] = useState<CardsData[]>([])
    const [restaurants, setRestaurants] = useState<RestaurantsData[]>([])

    useEffect(() => {
        (async () => {
            try {
                const productsRequest = getProducts();
                const restaurantsRequest = getRestaurants();
          
                const [productsResponse, restaurantsResponse] = await Promise.all([
                  productsRequest,
                  restaurantsRequest,
                ]);
          
                const mappedProducts: CardsData[] = productsResponse.data;
                const mappedRestaurants: RestaurantsData[] = restaurantsResponse.data;
          
                setProducts(mappedProducts);
                setRestaurants(mappedRestaurants);
              } catch (error) {
                console.log(error)
              }
        })()
    }, [])

    const contextValues = useMemo(
        () => ({products, setProducts, restaurants, setRestaurants}),
        [products, restaurants]
      )
    return <ProductsContext.Provider value={contextValues}>{children}</ProductsContext.Provider>
}