import api from './api'

export const novoProduto = async (nome, descricao, preco, imagem) =>
  api.post('produtos', { nome, descricao, preco, imagem })

export const editarProduto = async (id, nome, descricao, preco, imagem) =>
  api.put(`produtos/${id}`, { nome, descricao, preco, imagem })

export const deletarProduto = async (id) => api.delete(`produtos/${id}`)
