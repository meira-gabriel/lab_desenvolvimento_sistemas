import { createContext, ReactNode, useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginUser, getAllUsers } from '../services/accountService'
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
        const userRole = localStorage.getItem('role')

        if (userRecovered && token) {
            setUser(userRecovered)
            setRole(userRole)
            headers['Authorization'] = `Bearer ${token}`;
            api.defaults.headers = headers;
        }
    }, [])

    const loginUsuario = useCallback(async (userName: string, senha: string) => {
        try {
            const response = await LoginUser(userName, senha)

            if (response) {
                const verificaUser = await getAllUsers()

                const users = verificaUser.data
                const userToFind = response.data;

                const foundUser = users.find((user) => user.userName.toLowerCase() === userToFind.userName.toLowerCase());

                if (foundUser) {
                    if (foundUser.password.toLowerCase() === userToFind.senha.toLowerCase()) {
                        const userLogged = userName
                        const token = foundUser.token
                        const userRole = foundUser.role

                        localStorage.setItem('user', userLogged)
                        localStorage.setItem('token', token)
                        localStorage.setItem('role', userRole)

                        headers['Authorization'] = `Bearer ${token}`;
                        api.defaults.headers = headers;

                        setRole(foundUser.role)
                        setUser(userLogged)

                        return ("sucesso")
                    } else {
                        return ("senha incorreta")
                    }
                }
                return ("usuário não encontrado")
            } else {
                return ("erro no response")
            }

            // if (response.data.success === true) {
            //     const userLogged = userName
            //     const token = response.data.data.token

            //     localStorage.setItem('user', userLogged)
            //     localStorage.setItem('token', token)

            //     headers['Authorization'] = `Bearer ${token}`;
            //     api.defaults.headers = headers;

            //     setRole(response.data.role)
            //     setUser(userLogged)

            //     return 'sucesso'
            // }
        } catch (error: any) {
            return ('erro no catch')
            // if (error.response.status === 400) {
            //     if (error.response.data.success === false) {
            //         return error.response.data.message
            //     }
            //     if (error.response.data.errors) {
            //         return error.response.data.errors.Senha
            //     }
            // } else {
            //     console.log(error)
            // }
        }
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(user)
        localStorage.removeItem('token')

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
