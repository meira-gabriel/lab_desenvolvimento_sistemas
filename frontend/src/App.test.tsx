import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Sistema de delivery', () => {
  render(<App />)
  const linkElement = screen.getByText(/Food commerce/i)
  expect(linkElement).toBeInTheDocument()
})
