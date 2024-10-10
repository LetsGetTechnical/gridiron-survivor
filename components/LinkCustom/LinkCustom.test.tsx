import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCustom from './LinkCustom';

describe('LinkCustom Component', () => {
  it('renders with default props', () => {
    render(
      <LinkCustom children="Test link" dataTestidProp="linkCustom" href="https://example.com"></LinkCustom>,
    );
    const link = screen.getByTestId('linkCustom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Test link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
