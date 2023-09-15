import CardProducts from "../../../components/Cards/CardProducts";
import Head from "../../../components/Head";
import { useProducts } from "../../../hooks/useProducts";

interface TipoUsuarioProps {
    tipoUsuario: string
}

export default function Produtos({ tipoUsuario }: TipoUsuarioProps ) {
    const { products } = useProducts()
    
    return (
        <>
            <Head title="Produtos"></Head>
            <CardProducts productInfos={products} tipoUser={tipoUsuario}></CardProducts>
        </>
    )
}