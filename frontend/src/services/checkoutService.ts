import { CustomerData } from '../interfaces/customerData'
import { CreditCardData } from '../interfaces/creditCardData'
import { Product } from '../interfaces/product'
import api from './api'

export const processCheckout = (cart: Product[], customer: CustomerData, payment: CreditCardData) =>
  api.post('/checkout', {
    cart,
    customer: {
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      document: customer.document,
      zipCode: customer.zipCode,
      street: customer.street,
      number: customer.number,
      complement: customer.complement,
      neighborhood: customer.neighborhood,
      city: customer.city,
      state: customer.state,
    },
    payment: {
      creditCardNumber: payment.creditCardNumber,
      creditCardHolder: payment.creditCardHolder,
      creditCardExpiration: `${new Date(payment.creditCardExpiration).getMonth() + 1}/${new Date(
        payment.creditCardExpiration,
      ).getFullYear()}`,
      creditCardSecurityCode: payment.creditCardSecurityCode,
    },
    restaurantId: cart[0].idRestaurante,
  })
