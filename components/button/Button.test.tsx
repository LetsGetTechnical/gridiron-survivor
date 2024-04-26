import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

it('should render a button with no variant defined', () => {
  render(<Button />);
  const defaultButton = screen.getByRole('button');
  expect(defaultButton).toHaveClass('bg-orange-600');
});

it('should render a button with the link variant defined. It should have no background or border, only an underline on hover', () => {
  render(<Button variant="link" />);
  const defaultButton = screen.getByRole('button');
  expect(defaultButton).toHaveClass('underline-offset-4');
});
