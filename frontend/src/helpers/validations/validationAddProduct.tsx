import * as yup from 'yup'

export const schemaAddProducts = yup
  .object({
    nome: yup.string().required('O nome é obrigatório.'),
    preco: yup.string().required('O preço é obrigatório.').min(8, 'Valor incompleto'),
    descricao: yup.string().required('A descrição é obrigatória.'),
    categoria: yup.string().required('A categoria é obrigatória.'),
    imageUrl: yup.string(),
  })
  .required()

export type FieldValuesAddProducts = yup.InferType<typeof schemaAddProducts>
