import React from 'react';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Placeholder text" />,
    );
    expect(getByPlaceholderText('Placeholder text')).toBeInTheDocument();
  });
  it('renders the correct font color', () => {
    const { getByRole } = render(<Input />);
    const input = getByRole('textbox');
    expect(input).toHaveStyle({
      color: 'text-zinc-50',
    });
  });
});
