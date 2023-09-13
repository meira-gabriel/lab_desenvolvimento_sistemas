import { createContext, ReactNode, useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginUser } from '../services/accountService'
import api from '../services/api'

interface AccountContextProps {
    role: string
    user: string
    authenticated: boolean
    loginUsuario: (userName: string, senha: string) => Promise<string>
    logout: () => void
}

interface AccountProviderProps {
    children: ReactNode
}

export const AccountContext = createContext({} as AccountContextProps)

export function AccountProvider({ children }: AccountProviderProps) {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)
    const [role, setRole] = useState<any>('')

    const [headers] = useState<any>({});

    useEffect(() => {
        const userRecovered = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        const codigoCliente = Number(localStorage.getItem('codigoCliente'))

        if (userRecovered && token && codigoCliente) {
            setUser(userRecovered)
            headers['Authorization'] = `Bearer ${token}`;
            api.defaults.headers = headers;
        }
    }, [])

    const loginUsuario = useCallback(async (userName: string, senha: string) => {
        try {
            const response = await LoginUser(userName, senha)

            if (response.data.success === true) {
                const userLogged = userName
                const token = response.data.data.token

                localStorage.setItem('user', userLogged)
                localStorage.setItem('token', token)

                headers['Authorization'] = `Bearer ${token}`;
                api.defaults.headers = headers;

                setRole(response.data.role)
                setUser(userLogged)

                return 'sucesso'
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                if (error.response.data.success === false) {
                    return error.response.data.message
                }
                if (error.response.data.errors) {
                    return error.response.data.errors.Senha
                }
            } else {
                console.log(error)
            }
        }
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(user)
        localStorage.removeItem('token')
        localStorage.removeItem('clienteCode')

        headers['Authorization'] = null;
        api.defaults.headers = headers;

        setUser(null)
        navigate('/')
    }, [navigate, user])

    const contextValues = useMemo(
        () => ({
            authenticated: !!user,
            user,
            loginUsuario,
            logout,
            role,
            setRole
        }),
        [loginUsuario, logout, user, role]
    )

    return <AccountContext.Provider value={contextValues}>{children}</AccountContext.Provider>
}
