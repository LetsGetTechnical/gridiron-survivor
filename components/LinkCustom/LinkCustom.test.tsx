import React, { useState } from 'react';
import { prettyDOM, render, screen } from '@testing-library/react';
import LinkCustom from './LinkCustom';
import userEvent from '@testing-library/user-event';

describe('LinkCustom Component', () => {
  it('renders with default props and does not open in a new tab', () => {
    render(<LinkCustom href="https://example.com">Example Link</LinkCustom>);
    const link = screen.getByTestId('link-custom');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('target', '_blank');
    expect(link).toHaveClass('hover:text-orange-600', 'hover:underline');
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
    expect(link).toHaveClass('hover:text-orange-600', 'hover:underline');
  });
});
