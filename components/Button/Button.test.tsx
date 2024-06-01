import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

const variants: Array<
  | 'link'
  | 'default'
  | 'outline'
  | 'destructive'
  | 'secondary'
  | 'ghost'
  | null
  | undefined
> = ['default', 'outline', 'destructive', 'secondary', 'ghost', 'link'];
const sizes: Array<'default' | 'sm' | 'lg' | 'icon' | null | undefined> = [
  'default',
  'sm',
  'lg',
  'icon',
];

const variantClasses = {
  default: 'bg-orange-600 text-white hover:bg-orange-600/90',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};
describe('Button', () => {
  variants.forEach((variant) => {
    sizes.forEach((size) => {
      it(`renders correctly with variant ${variant} and size ${size}`, () => {
        render(
          <Button variant={variant} size={size}>
            Test Button
          </Button>,
        );

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Check if the button has the correct class for the variant and size
        if (variant) {
          expect(button).toHaveClass(variantClasses[variant]);
        }
        if (size) {
          expect(button).toHaveClass(sizeClasses[size]);
        }
      });
    });
  });
});
