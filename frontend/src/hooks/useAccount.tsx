import { useContext } from 'react'

import { AccountContext } from '../contexts/AccountContext'

export function useAccount() {
    return useContext(AccountContext)
}