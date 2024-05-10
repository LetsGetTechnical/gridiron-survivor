import React from 'react';
import '@testing-library/jest-dom';
import { Input } from '@/components/Input/Input';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '@/components/Logo/Logo';
import { Button } from '@/components/Button/Button';
import Login from './page';

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
  it('Checks that the password input is rendered correctly by checking the placeholder text and type', () => {
    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('Mocks the login process', () => {
    jest.mock('./page.tsx', () => ({
      Login: jest.fn().mockReturnValue({ email: 'testemail@email.com' }),
    }));
    // Render the input and button components
    render(<Input type="email" placeholder="Email" />);
    const emailInput = screen.getByPlaceholderText('Email');
    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText('Password');
    render(<button role="button">Continue</button>);

    // Find the button by it's role
    const button = screen.getByRole('button');

    // Mock the click event
    fireEvent.click(button);

    // Checke that the Login function was called
    expect(Login()).toHaveBeenCalled();
    expect(Login()).toEqual({ email: 'testemail@email.com' });
  });
});
