import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import ButtonLogin from "../components/Button"

describe('<ButtonLogin>', () => {
    it('mostrar botão renderizado', () => {
      const { getByText } = render(<ButtonLogin />);

      expect(getByText('Login')).toBeInTheDocument();
    })
  })