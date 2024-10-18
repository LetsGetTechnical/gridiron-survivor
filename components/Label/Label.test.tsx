import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label'; 

describe('Label', () => {
  const disabledVariants = [true, false]; 

  disabledVariants.forEach((disabled) => {
    it(`renders correctly when disabled is ${disabled}`, () => {
      render(
        <Label data-testid="test-label" disabled={disabled}>
          Test Label
        </Label>
      );

      const label = screen.getByTestId('test-label');
      expect(label).toBeInTheDocument();

      const expectedClass = disabled ? 'opacity-50 cursor-not-allowed' : 'peer-aria-checked:border-accent peer-hover:border-white';
      expect(label).toHaveClass(expectedClass);
    });
  });

  it('applies additional custom classes correctly', () => {
    const extraClasses = 'custom-class-label extra-custom-class';
    render(
      <Label
        data-testid="custom-class-label"
        className={extraClasses}
      >
        Custom Test Label
      </Label>
    );

    const labelCustom = screen.getByTestId('custom-class-label');
    expect(labelCustom).toBeInTheDocument();
    expect(labelCustom).toHaveClass(extraClasses);
  });
});

