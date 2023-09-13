import { useContext } from 'react'

import { AccountContext } from '../contexts/accountContext'

export function useAccount() {
    return useContext(AccountContext)
}