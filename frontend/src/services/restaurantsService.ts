import { RestaurantsData } from "../interfaces/restaurantsData"
import api from "./api"

export const getRestaurants = async () => api.get<RestaurantsData[]>('/restaurantes')