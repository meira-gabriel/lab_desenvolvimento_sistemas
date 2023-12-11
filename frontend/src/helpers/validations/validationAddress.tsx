import * as yup from 'yup'
import { isValidCNPJ, isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils'

export const schemaAddress = yup
  .object({
    fullName: yup
      .string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ser completo.')
      .matches(/(\w.+\s).+/gi, 'O nome deve conter o sobrenome.'),
    email: yup.string().required('O email é obrigatório.').email('O email deve ser válido.'),
    mobile: yup
      .string()
      .required('O celular é obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .test('validateMobile', 'O celular inválido.', (value) => isValidPhone(value)),
    document: yup
      .string()
      .required('O CPF/CNPJ é obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .test(
        'validateDocument',
        'O CPF/CNPJ é inválido.',
        (value) => isValidCPF(value) || isValidCNPJ(value),
      ),
    zipCode: yup
      .string()
      .required('O CEP é obrigatório.')
      .transform((val) => val.replace(/[^\d]+/g, '')),
    state: yup.string().required('O Estado é obrigatório.'),
    city: yup.string().required('A Cidade é obrigatória.'),
    neighborhood: yup.string().required('O bairro é obrigatório.'),
    complement: yup.string(),
    street: yup.string().required('O Endereço é obrigatório.'),
    number: yup.string().required('O N° do endereço é obrigatório'),
  })
  .required()

export type FieldValuesAddress = yup.InferType<typeof schemaAddress>
