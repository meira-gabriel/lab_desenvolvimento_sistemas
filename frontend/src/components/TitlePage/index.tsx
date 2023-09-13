import { ReactNode } from "react"
import { Title } from "./styles"

interface TitleProps {
    children: ReactNode
}

export default function TitlePage({children}: TitleProps) {
    return <Title>{children}</Title>
}