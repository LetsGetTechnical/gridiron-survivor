import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import Logo from '@/components/Logo/Logo';
import logo from '@/public/assets/logo-colored-outline.svg';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';

describe('Login Page', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Logo src={logo} />);
    expect(getByTestId('badge-logo')).toBeInTheDocument();
    expect(Image.src).toBe({ logo });
  });
});
