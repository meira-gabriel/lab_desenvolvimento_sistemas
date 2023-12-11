import * as yup from 'yup'
import isValidCreditCard from 'card-validator'

export const schemaCreditCard = yup
  .object({
    creditCardHolder: yup
      .string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ser completo.')
      .matches(/(\w.+\s).+/gi, 'O nome deve conter o sobrenome.'),
    creditCardNumber: yup
      .string()
      .required('O número do cartão é obrigatório.')
      .transform((val) => val.replace(/[^\d]+/g, ''))
      .test(
        'validateCreditCardNumber',
        'O número do cartão é inválido.',
        (value) => isValidCreditCard.number(value).isValid,
      ),
    creditCardExpiration: yup
      .string()
      .required('A data de validade é obrigatória.')
      .transform((value) => {
        const [month, year] = value.split('/')

        if (month && year && month.length === 2 && year.length === 2)
          return new Date(+`20${year}`, +month - 1, 1).toISOString()

        return value
      })
      .test(
        'validateCreditCardExpiration',
        'A data de validade é inválida.',
        (value) => new Date(value) >= new Date(),
      ),
    creditCardSecurityCode: yup
      .string()
      .required('O CVV é obrigatório.')
      .transform((value) => value.replace(/[^\d]+/g, ''))
      .min(3, 'O CVV deve possuir entre 3 e 4 dígitos.')
      .max(4, 'O CVV deve possuir entre 3 e 4 dígitos.'),
  })
  .required()

export type FieldValuesCreditCard = yup.InferType<typeof schemaCreditCard>
