import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
  test('renders the correct heading level with default props', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  });

  test('applies the correct CSS classes based on the heading level', () => {
    render(<Heading heading="h3">Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-semibold', 'text-base', 'leading-8');
  });

  test('handles undefined string heading prop and default it to "h1"', () => {
    render(<Heading heading={undefined}>Test Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  });
});
