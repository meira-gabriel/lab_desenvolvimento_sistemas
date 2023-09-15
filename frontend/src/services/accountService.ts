import { AccountData } from "../interfaces/accountData";
import { LoginData } from "../interfaces/loginData";
import api from "./api";

export const LoginUser = async (userName: string, senha: string) => 
    api.post<AccountData>('/Login', { userName, senha })

export const getAllUsers = async () => api.get<LoginData[]>('/users')