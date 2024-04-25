import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('renders correctly', () => {
    const { getByAltText } = render(
      <Logo src="/assets/logo-colored-outline.svg" />,
    );
    expect(getByAltText('Gridiron Survivor logo')).toBeInTheDocument();
  });
});
