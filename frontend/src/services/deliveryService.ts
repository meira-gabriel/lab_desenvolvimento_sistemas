import api from './api'

export const getAllDeliveries = async () => api.get<any[]>('/deliveries')

export const getDeliveryById = async (deliveryId: number) =>
  api.get<any>(`/delivery/${deliveryId}`)

export const setStatusDelivery = async (deliveyId: number, statusDelivery: string) =>
  api.put<any[]>(`/startDelivery/${deliveyId}?status=${statusDelivery}`)

export const updateDeliveryPosition = async (deliveryId: number, lat: string, lng: string) =>
  api.put<any>(`/produtos/${deliveryId}`, { lat, lng })
