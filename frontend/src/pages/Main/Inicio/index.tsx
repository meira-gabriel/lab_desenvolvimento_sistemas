import CardRestaurants from "../../../components/Cards/CardRestaurants";
import Head from "../../../components/Head";
import { useProducts } from "../../../hooks/useProducts";

export default function Restaurantes() {
    const { restaurants } = useProducts()
    return (
        <>
            <Head title="Início"></Head>
            <CardRestaurants cardInfos={restaurants}></CardRestaurants>
        </>
    )
}