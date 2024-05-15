import React from 'react';
import '@testing-library/jest-dom';
import { Input } from '@/components/Input/Input';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '@/components/Logo/Logo';
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
  it('Checks that the password input is rendered correctly by checking the placeholder text and type', () => {
    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it('Mocks the login process', () => {
    // Render the input email component and sets it's value
    render(<Input type="email" placeholder="Email" />);
    const emailInput = screen.getByPlaceholderText('Email');
    emailInput.textContent = 'testemail@email.com';
    // Render the input password component and sets it's value
    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText('Password');
    passwordInput.textContent = 'test1234';

    // Establish blank handleClick function
    const handleClick = jest.fn();
    // Render and Find the button by it's role
    const { getByRole } = render(
      <Button onClick={handleClick} role="button">
        Continue
      </Button>,
    );
    const button = getByRole('button');

    // Mock the click event
    fireEvent.click(button);

    // Checks for various test results
    // 1. Checks that emailInput rendered and has the expected text content
    // 2. Checks that passwordInput rendered and has the expected text content
    // 3. Checks that the Button rendered and has been clicked and has called the handleClick function

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveTextContent('testemail@email.com');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveTextContent('test1234');

    expect(button).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
