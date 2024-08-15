import { ImageProps } from 'next/image';
import { render, screen } from '@testing-library/react';
import GlobalSpinner from './GlobalSpinner';
import React from 'react';

interface IMockNextImageProps {
  alt: string;
  height: number;
  src: string;
  width: number;
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: IMockNextImageProps) => {
    const { alt, height, src, width }: IMockNextImageProps = props;
    return (
      <img
        alt={alt}
        data-testId="global-spinner-image"
        height={100}
        src="@/public/assets/global-spinner.svg"
        width={100}
      />
    );
  },
}));

describe('GlobalSpinner', () => {
  beforeEach(() => {
    render(<GlobalSpinner />);
  });

  it('should render without errors', () => {
    const globalSpinner = screen.getByTestId('global-spinner');
    expect(globalSpinner).toBeInTheDocument();
  });

  it('should use the correct image source', () => {
    const image = screen.getByTestId(
      'global-spinner-image',
    ) as HTMLImageElement;
    expect(image.src).toContain('global-spinner');
  });
});
