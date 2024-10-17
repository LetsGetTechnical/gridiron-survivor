import { LabelText } from '../LabelText/LabelText';
import { RadioGroupDefault, RadioGroupDefaultItem } from './RadioGroupDefault';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('RadioGroupDefault', () => {
  beforeEach(() => {
    render(
      <RadioGroupDefault defaultValue="all" required>
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem value="all" id="all" />
          <LabelText htmlFor="all">All users</LabelText>
        </div>
      </RadioGroupDefault>,
    );
  });

  it('renders the RadioGroupDefault component', () => {
    const radioGroup = screen.getByTestId('radio-group-default');
    expect(radioGroup).toBeInTheDocument();
  });

  it('renders the RadioGroupDefaultItem component', () => {
    const radioGroupItem = screen.getByTestId('radio-group-default-item');
    expect(radioGroupItem).toBeInTheDocument();
  });

  it('renders the RadioGroupPrimitive.Indicator within RadioGroupDefaultItem', () => {
    const indicator = screen.getByTestId('radio-group-default-indicator');
    expect(indicator).toBeInTheDocument();
  });
});
