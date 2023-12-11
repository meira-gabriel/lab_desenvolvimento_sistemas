import { Customer, Delivery, Order, PrismaClient } from "@prisma/client";

import { CustomerData } from "../interfaces/CustomerData";
import { PaymentData } from "../interfaces/PaymentData";
import { ProductData } from "../interfaces/ProductData";
import PaymentService from "./PaymentService";

import NodeGeocoder from "node-geocoder";
import { RestaurantData } from "../interfaces/RestaurantData";
import { DeliveryData } from "../interfaces/DeliveryData";

const options = {
  provider: "google" as "google",
  apiKey: "AIzaSyCJLS8HX5AscFArjluDOfh7hGothUao_U0",
};

const geocoder = NodeGeocoder(options);

interface OrderWithRestaurant extends Order {
  restaurant?: RestaurantData;
}

export default class CheckoutService {
  private prisma: PrismaClient;

  // new CheckoutService()
  constructor() {
    this.prisma = new PrismaClient();
  }

  async process(
    cart: ProductData[],
    customer: CustomerData,
    payment: PaymentData,
    restaurantId: number
  ): Promise<{
    id: number;
    transactionId: string;
    status: string;
    deliveryId: number;
  }> {
    // TODO: "puxar" os dados de snacks do BD
    // in: [1,2,3,4]
    const snacks = await this.prisma.produto.findMany({
      where: {
        id: {
          in: cart.map((snack) => snack.id),
        },
      },
    });
    // console.log(`snacks`, snacks)

    const snacksInCart = snacks.map<ProductData>((snack) => ({
      ...snack,
      preco: Number(snack.preco),
      quantity: cart.find((item) => item.id === snack.id)?.quantity!,
      subTotal:
        cart.find((item) => item.id === snack.id)?.quantity! *
        Number(snack.preco),
    }));
    // console.log(`snacksInCart`, snacksInCart)

    // TODO: registrar os dados do cliente no BD
    const customerCreated = await this.createCustomer(customer);
    // console.log(`customerCreated`, customerCreated)

    // TODO: criar uma order orderitem
    let orderCreated = await this.createOrder(
      snacksInCart,
      customerCreated,
      restaurantId
    );
    // console.log(`orderCreated`, orderCreated)

    // TODO: processar o pagamento
    const { transactionId, status } = await new PaymentService().process(
      orderCreated,
      customerCreated,
      payment
    );

    const addressDestination = await this.getCoordenadas(customerCreated);

    const deliveryInfos = {
      id: 0,
      lat: orderCreated.restaurant?.lat!,
      lng: orderCreated.restaurant?.lng!,
      latDestination: addressDestination.lat!,
      lngDestination: addressDestination.lng!,
      orderId: orderCreated.id,
      restaurantId: restaurantId,
      customerId: customerCreated.id,
    };

    const delivery = await this.createDelivery(deliveryInfos);

    orderCreated = await this.prisma.order.update({
      where: { id: orderCreated.id },
      data: {
        transactionId,
        status,
      },
    });

    return {
      id: orderCreated.id,
      transactionId: orderCreated.transactionId!,
      status: orderCreated.status,
      deliveryId: delivery.id,
    };
  }

  private async createCustomer(customer: CustomerData): Promise<Customer> {
    const customerCreated = await this.prisma.customer.upsert({
      where: { email: customer.email },
      update: customer,
      create: customer,
    });

    return customerCreated;
  }

  private async createOrder(
    snacksInCart: ProductData[],
    customer: Customer,
    restaurantId: number
  ): Promise<OrderWithRestaurant> {
    const total = snacksInCart.reduce((acc, snack) => acc + snack.subTotal, 0);
    const orderCreated = await this.prisma.order.create({
      data: {
        total,
        customer: {
          connect: { id: customer.id },
        },
        orderItems: {
          createMany: {
            data: snacksInCart.map((snack) => ({
              produtoId: snack.id,
              quantity: snack.quantity,
              subTotal: snack.subTotal,
            })),
          },
        },
        restaurant: {
          connect: { id: restaurantId },
        },
      },
      include: {
        customer: true,
        orderItems: { include: { produto: true } },
        restaurant: true,
      },
    });

    return orderCreated;
  }

  private async getCoordenadas(customerCreated: Customer) {
    try {
      const res = await geocoder.geocode(
        `${customerCreated.street}, ${customerCreated.number}, ${customerCreated.neighborhood}, ${customerCreated.city}, ${customerCreated.state}`
      );

      const coordenadas = {
        lat: res[0].latitude?.toString(),
        lng: res[0].longitude?.toString(),
      };

      return coordenadas;
    } catch (err) {
      console.error("Erro na geocodificação:", err);
      return { lat: "0", lng: "0" };
    }
  }

  private async createDelivery(delivery: DeliveryData): Promise<Delivery> {
    const deliveryCreated = await this.prisma.delivery.create({
      data: {
        lat: delivery.lat,
        lng: delivery.lng,
        latDestination: delivery.latDestination,
        lngDestination: delivery.lngDestination,
        orderId: delivery.orderId,
        restaurantId: delivery.restaurantId,
        customerId: delivery.customerId
      },
    });

    return deliveryCreated;
  }
}
