import { CardsData } from "../interfaces/cardsData"
import api from "./api"

export const getProducts = async () => api.get<CardsData[]>('/produtos')