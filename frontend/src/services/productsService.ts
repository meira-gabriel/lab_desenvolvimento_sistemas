import { ProductsData } from '../interfaces/productsData'
import api from './api'

export const getProducts = async () => api.get<ProductsData[]>('/produtos')

export const editProduct = async ({
  id,
  nome,
  descricao,
  imageUrl,
  preco,
  categoria,
}: ProductsData) =>
  api.put<ProductsData>(`/produtos/${id}`, { nome, descricao, imageUrl, preco, categoria })

export const deleteProduct = async (id: number) => api.delete(`/produtos/${id}`)

export const newProduct = async ({
  idRestaurante,
  nome,
  descricao,
  imageUrl,
  preco,
  categoria,
}: ProductsData) =>
  api.post<ProductsData>('/produtos', {
    idRestaurante,
    nome,
    descricao,
    imageUrl,
    preco,
    categoria,
  })
