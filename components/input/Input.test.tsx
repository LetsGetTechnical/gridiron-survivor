import React from 'react';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Placeholder text" />);
    expect(getByPlaceholderText('Placeholder text')).toBeInTheDocument();
  });
});