import { TokenData } from "./TokenData"

export interface LoginData {
    message: string
    success: boolean
    role?: string
    data: TokenData
}