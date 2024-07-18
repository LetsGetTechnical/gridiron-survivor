import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label'; 

const variants:Array<
| 'weeklyPickButtonLabel'
| 'inputLabel'
| null
| undefined
> = ['weeklyPickButtonLabel', 'inputLabel'];

const variantClasses = {
  weeklyPickButtonLabel: 'text-zinc-50 cursor-pointer rounded-xl items-center py-4 px-3 border-2 border-zinc-800 peer-aria-checked:border-orange-600 peer-hover:bg-zinc-800 flex',
  inputLabel: 'text-zinc-900 cursor-text flex-col',
};

describe('Label', () => {
  variants.forEach((variant) => {
    it(`renders correctly with variant ${variant}`, () => {
      render(
        <Label data-testid="testLabel" variant={variant}>
          Test Label
        </Label>
      );

      const label = screen.getByTestId('testLabel');
      expect(label).toBeInTheDocument();
      if (variant) {
        expect(label).toHaveClass(variantClasses[variant]);
    }
    });
  });

  it(`applies additional custom classes correctly`, () => {
    render(
      <Label
        data-testid="customClassLabel"
        className="customClassLabel extra-custom-class"
      >
        Custom Test Label
      </Label>
    );

    const labelCustom = screen.getByTestId('customClassLabel');
    expect(labelCustom).toBeInTheDocument();
    if (labelCustom.hasAttribute('className')) {
        expect(labelCustom).toHaveClass('customClassLabel extra-custom-class');
    }
  });
});