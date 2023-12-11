import React, { useState } from 'react'

import CreditCardIcon from '@mui/icons-material/CreditCard'
import HomeIcon from '@mui/icons-material/Home'
import PixIcon from '@mui/icons-material/Pix'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PagamentoCartao from './PagamentoCartao'
import PagamentoEntrega from './PagamentoEntrega'
import PagamentoPix from './PagamentoPix'

export default function InfosPagamento(infosCustomer: any) {
  const [value, setValue] = useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <h3>Pagamento</h3>
      <div className='tabs mb-3'>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<CreditCardIcon />} value={1} label='Cartão' />
          <Tab icon={<HomeIcon />} value={2} label='Pagamento na entrega' />
          <Tab icon={<PixIcon />} value={3} label='Pix' />
        </Tabs>
      </div>

      <CustomTabPanel value={value} index={1}>
        <PagamentoCartao customer={infosCustomer} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PagamentoEntrega />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <PagamentoPix />
      </CustomTabPanel>
    </>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}
