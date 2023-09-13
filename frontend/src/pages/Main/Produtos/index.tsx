import { useState } from "react";
import CardProducts from "../../../components/Cards/CardProducts";
import Head from "../../../components/Head";
import { useProducts } from "../../../hooks/useProducts";
import { Container } from "./styles";

export default function Inicio() {
    const { products } = useProducts()

    const [classNameActive, setClassNameActive] = useState(false)
    const [userActive, setUserActive] = useState(true)

    function onClickButtonAdmin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setClassNameActive(!classNameActive)
        setUserActive(false)
    }

    function onClickButtonUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        setClassNameActive(!classNameActive)
        setUserActive(true)
    }

    return (
        <>
            <Container>
                <div>
                    <button onClick={onClickButtonUser} className={!classNameActive ? 'active' : ''}>Usuário</button>
                    <button onClick={onClickButtonAdmin} className={classNameActive ? 'active' : ''}>Admin</button>
                </div>
                {!userActive ?
                    <div>
                        <button>+ Novo produto</button>
                    </div> : null
                }
            </Container>
            <Head title="Produtos"></Head>
            <CardProducts productInfos={products} user={userActive}></CardProducts>
        </>
    )
}