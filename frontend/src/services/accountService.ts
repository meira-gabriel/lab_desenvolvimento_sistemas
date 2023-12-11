import { AccountData } from "../interfaces/accountData";
import { LoginData } from "../interfaces/loginData";
import api from "./api";

export const LoginUser = async (userName: string, password: string) => 
    api.post<AccountData>('/Login', { userName, password })

export const getAllUsers = async () => api.get<LoginData[]>('/users')