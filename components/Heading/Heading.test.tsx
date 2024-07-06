import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
  test('test correct CSS classes for h1', () => {
    render(<Heading as="h1">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'font-extrabold',
      'text-5xl',
      'leading-none',
      'tracking-tight',
    );
  });

  test('test correct CSS classes for h2', () => {
    render(<Heading as="h2">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'font-bold',
      'text-[2rem]',
      'leading-[1.125rem]',
      'tracking-tighter',
    );
  });

  test('test correct CSS classes for h3', () => {
    render(<Heading as="h3">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'font-semibold',
      'text-base',
      'leading-8',
      'tracking-tighter',
    );
  });

  test('test correct CSS classes for h4', () => {
    render(<Heading as="h4">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'font-semibold',
      'text-sm',
      'leading-7',
      'tracking-tighter',
    );
  });
});
