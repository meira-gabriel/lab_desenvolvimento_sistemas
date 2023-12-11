export interface DeliveryData {
  id: number;
  status?: string;
  lat: string;
  lng: string;
  latDestination: string;
  lngDestination: string;
  orderId: number;
  restaurantId: number;
  customerId: number;
}
