import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from './Button';

describe('Button variants', () => {
  const variants = [
    'default',
    'outline',
    'destructive',
    'secondary',
    'ghost',
    'link',
  ];

  variants.forEach((variant) => {
    test(`renders ${variant} variant correctly`, () => {
      render(
        <Button
          data-testid={`ButtonVariant${variant}`}
          variant={variant}
          label={`Button ${variant}`}
        />,
      );

      const button = screen.getByTestId(`ButtonVariant${variant}`);

      expect(button).toHaveClass(
        buttonVariants({ variant, size: 'default' }).split(' ')[0],
      );
    });
  });
});
