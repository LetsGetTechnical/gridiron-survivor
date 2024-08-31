import { LabelText } from './LabelText';
import { render } from '@testing-library/react';
import React from 'react';

describe('LabelText Component', () => {
  it('renders properly', () => {
    const { getByTestId } = render(<LabelText>Test Label</LabelText>);
    expect(getByTestId('label-text')).toBeInTheDocument();
  });

  it('renders the correct text', () => {
    const { getByTestId } = render(<LabelText>Test Label</LabelText>);
    expect(getByTestId('label-text')).toHaveTextContent('Test Label');
  });

  it('applies disabled styles when peer-disabled', () => {
    const { getByTestId } = render(
      <LabelText className="peer-disabled">Test Label</LabelText>,
    );
    expect(getByTestId('label-text')).toHaveClass(
      'peer-disabled:cursor-not-allowed',
    );
    expect(getByTestId('label-text')).toHaveClass('peer-disabled:opacity-70');
  });
});
