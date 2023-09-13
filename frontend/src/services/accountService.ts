import { LoginData } from "../interfaces/loginData";
import api from "./api";

export const LoginUser = async (userName: string, senha: string) => api.post<LoginData>('/Login', { userName, senha })