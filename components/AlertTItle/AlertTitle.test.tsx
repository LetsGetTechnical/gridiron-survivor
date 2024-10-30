import React from 'react';
import { render } from '@testing-library/react';
import { AlertTitle } from './AlertTitle';

describe('AlertTitle', () => {
  it('renders the title text', () => {
    const { getByText } = render(<AlertTitle title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });
});
