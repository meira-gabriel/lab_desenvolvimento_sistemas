export interface ProductsData {
    id: number
    nome: string
    descricao: string
    imageUrl: string
    preco: number
    categoria?: string
    idRestaurante?: number
}