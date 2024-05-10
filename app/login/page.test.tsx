import React from 'react';
import '@testing-library/jest-dom';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '@/components/Logo/Logo';

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
  it('Checks that the continue button is rendered correctly by checking the label', () => {
    render(<Button role="button" label="Continue" />);
    const continueButton = screen.getByRole('button');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton.textContent).toBe('Continue');
  });

  // Login.test.tsx
  test('should log in successfully', async ({ page }) => {
    // Render the Login component
    render(<Input type="email" placeholder="Email" />);
    const emailInput = screen.getByPlaceholderText('Email');
    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Mock data
    const email = 'testemail@email.com';
    const password = 'test1234';

    // Fill the form with mock data
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    });

    // Click the submit button
    fireEvent.click(screen.getByRole('Button'));

    // Wait for navigation or some indication of success
    await page.waitForNavigation();

    // Check if the login was successful
    // This part depends on what happens after a successful login
    // For example, checking if a specific element is present
    const loggedInElement = await page.$('.loggedIn');
    expect(loggedInElement).toBeTruthy();

    // Optionally, check the URL or other indicators of success
    expect(page.url()).toContain('/weeklypicks'); // Assuming the dashboard URL changes after login
  });
});
