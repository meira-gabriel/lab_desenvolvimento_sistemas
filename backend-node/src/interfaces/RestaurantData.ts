import { Decimal } from "@prisma/client/runtime/library";

export interface RestaurantData {
  id: number;
  nome: string;
  imageUrl: string;
  grupo: string;
  nota: Decimal;
  lat: string;
  lng: string;
}
