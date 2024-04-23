import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';
import { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <img {...props} src={props.src as string} />;
  },
}));

describe('Logo', () => {
  it('renders correctly', () => {
    const { getByAltText } = render(<Logo />);
    expect(getByAltText('Gridiron Survivor logo')).toBeInTheDocument();
  });
});