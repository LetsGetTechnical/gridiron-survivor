import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCustom from './LinkCustom';

describe('LinkCustom Component', () => {
  it('renders with default props and does not open in a new tab', () => {
    render(<LinkCustom href="https://example.com">Example Link</LinkCustom>);
    const link = screen.getByTestId('link-custom');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('target', '_blank');
  });

  it('opens in a new tab when newTab is true', () => {
    render(
      <LinkCustom href="https://example.com" newTab>
        Example New Tab Link
      </LinkCustom>,
    );
    const link = screen.getByTestId('link-custom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
