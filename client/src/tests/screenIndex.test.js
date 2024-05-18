import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Index from "../pages/index"
 
describe('Index', () => {
    it('pegar o texto da tela inicial', () => {
      render(<Index />)
      // screen.debug();
      expect(screen.getByText('BEM VINDO AO FILMTALK')).toBeInTheDocument()
    })
  })