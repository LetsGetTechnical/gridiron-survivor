import React from 'react';
import { screen, render } from '@testing-library/react';
import Logo from '@/components/Logo/Logo';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';

describe('Login Page', () => {
  it('Checks that the Logo image rendered has the correct test-id and src', () => {
    const src = '/assets/logo-colored-outline.svg';
    const { getByTestId } = render(<Logo src={src} />);
    const logoElement = getByTestId('badge-logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', src);
  });
  it('Checks that the email input is rendered correctly by checking the placeholder text and type', () => {
    render(<Input type="email" placeholder="Email" />);
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});
