/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginUser } from '../services/accountService'
import api from '../services/api'

interface AccountContextProps {
  role: string
  user: string
  authenticated: boolean
  loginUsuario: (userName: string, senha: string) => Promise<any>
  logout: () => void
  idAdmin: number
}

interface AccountProviderProps {
  children: ReactNode
}

export const AccountContext = createContext({} as AccountContextProps)

export function AccountProvider({ children }: AccountProviderProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<any>('')
  const [idAdmin, setIdAdmin] = useState<number>(0)

  const [headers] = useState<any>({})

  useEffect(() => {
    const userRecovered = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')
    const adminId = localStorage.getItem('idAdmin')

    if (userRecovered && token) {
      setUser(userRecovered)
      setRole(userRole)
      setIdAdmin(Number(adminId))
      headers['Authorization'] = `Bearer ${token}`
      api.defaults.headers = headers
    }
  }, [])

  const loginUsuario = useCallback(async (userName: string, senha: string) => {
    try {
      const response = await LoginUser(userName, senha)

      if (response.data.success === true) {
        const userLogged = userName
        const token = response.data.token as string
        const role = response.data.role as string
        const adminId = response.data.idAdmin || null

        localStorage.setItem('user', userLogged)
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        if (adminId) {
            localStorage.setItem('idAdmin', adminId.toString())
            setIdAdmin(adminId)
        }

        headers['Authorization'] = `Bearer ${token}`
        api.defaults.headers = headers

        setRole(role)
        setUser(userLogged)

        return { message: 'sucesso', role: role }
      }
    } catch (error: any) {
      return { message: error.response.data.message, role: '' }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    localStorage.removeItem('idAdmin')

    headers['Authorization'] = null
    api.defaults.headers = headers

    setUser(null)
    setIdAdmin(0)
    setRole('')
    navigate('/')
  }, [navigate, user, role])

  const contextValues = useMemo(
    () => ({
      authenticated: !!user,
      user,
      loginUsuario,
      logout,
      role,
      setRole,
      idAdmin
    }),
    [loginUsuario, logout, user, role, idAdmin],
  )

  return <AccountContext.Provider value={contextValues}>{children}</AccountContext.Provider>
}
