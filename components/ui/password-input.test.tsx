import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordInput } from './password-input'
import { expect, test, describe } from 'vitest'

describe('PasswordInput', () => {
  test('renders with password type initially', () => {
    render(<PasswordInput label="Password" />)
    const input = screen.getByLabelText(/^password$/i)
    expect(input).toHaveAttribute('type', 'password')
  })

  test('toggles visibility when eye icon is clicked', () => {
    render(<PasswordInput label="Password" />)
    const input = screen.getByLabelText(/^password$/i)
    const button = screen.getByRole('button')

    // Click to show
    fireEvent.click(button)
    expect(input).toHaveAttribute('type', 'text')

    // Click to hide again
    fireEvent.click(button)
    expect(input).toHaveAttribute('type', 'password')
  })
})
