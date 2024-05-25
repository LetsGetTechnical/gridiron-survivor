import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCustom from './LinkCustom';

describe('LinkCustom Component', () => {
  it('renders with default props and does not open in a new tab', () => {
    render(
      <LinkCustom
        children="Test link that should open in the same tab when clicked"
        href="https://example.com"
      ></LinkCustom>,
    );
    const link = screen.getByTestId('linkCustom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(
      'Test link that should open in the same tab when clicked',
    );
    expect(link).not.toHaveAttribute('target', '_blank');
    expect(link).toHaveClass('hover:text-orange-600', 'hover:underline');
  });

  it('opens in a new tab when newTab is true', () => {
    render(
      <LinkCustom
        children="Test link that should open in a new tab when clicked"
        href="https://example.com"
        newTab
      ></LinkCustom>,
    );
    const link = screen.getByTestId('linkCustom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(
      'Test link that should open in a new tab when clicked',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass('hover:text-orange-600', 'hover:underline');
  });
});
