import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders the default variant', () => {
    render(<Button data-testid="Default Variant" />);
    const button = screen.getByTestId(/Default Variant/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'rounded-md',
      'text-sm',
      'font-medium',
      'ring-offset-background',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'bg-orange-600',
      'text-white',
      'hover:bg-orange-600/90',
    );
  });
});
